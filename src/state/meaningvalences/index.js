import { call, all, takeEvery, put } from 'redux-saga/effects'

import * as selectors from './selectors'
import * as constants from './constants'

import {
  addByIdToObject,
  addManyByIdToObject,
  removeFromObjectById
} from '../util'

import api from 'api'
import pagination from 'state/pagination'
import examples from 'state/examples'
import meanings from 'state/meanings'
import valenceframes from 'state/valenceframes'

const paginator = pagination('/api/meaning-valences/', 'meaningvalences', selectors.getAll)

export const initialState = {
}

export const types = {
  LOAD: 'valex/meaningvalences/load',
  LOAD_NEXT: 'valex/meaningvalences/load-next',
  LOAD_SUCCESS: 'valex/meaningvalences/load_success',
  LOAD_ERROR: 'valex/meaningvalences/load_error',
  CREATE: 'valex/meaningvalences/create',
  CREATE_SUCCESS: 'valex/meaningvalences/create_success',
  CREATE_ERROR: 'valex/meaningvalences/create_error',
  REMOVE: 'valex/meaningvalences/remove',
  REMOVE_SUCCESS: 'valex/meaningvalences/remove_success',
  REMOVE_ERROR: 'valex/meaningvalences/remove_error',
  UPDATE: 'valex/meaningvalences/update',
  UPDATE_SUCCESS: 'valex/meaningvalences/update_success',
  UPDATE_ERROR: 'valex/meaningvalences/update_error',
  UPDATE_RELATIONSHIP: 'valex/meaningvalences/update_relationship',
  REMOVE_RELATIONSHIP: 'valex/meaningvalences/remove_relationship'
}

export const actions = {
  load(config, {multiple=false, loadRelated=0, loadParents=0} = {}) {
    return {
      type: types.LOAD,
      payload: config,
      meta: {
        single: !multiple,
        multiple,
        loadRelated,
        loadParents
      }
    }
  },
  loadSuccess(meaningvalences) {
    return {
      type: types.LOAD_SUCCESS,
      payload: meaningvalences
    }
  },
  loadError(error) {
    return {
      type: types.LOAD_ERROR,
      payload: error
    }
  },
  create(meaningValence) {
    return {
      type: types.CREATE,
      payload: meaningValence
    }
  },
  createSuccess(meaningValence) {
    return {
      type: types.CREATE_SUCCESS,
      payload: meaningValence
    }
  },
  createError(meaningValence) {
    return {
      type: types.CREATE_ERROR,
      payload: meaningValence
    }
  },
  remove(id){
    return {
      type: types.REMOVE,
      payload: {id}
    }
  },
  removeSuccess(id){
    return {
      type: types.REMOVE_SUCCESS,
      payload: {id}
    }
  },
  removeError(id){
    return {
      type: types.REMOVE_ERROR,
      payload: {id}
    }
  },
  update(meaningValence){
    return {
      type: types.UPDATE,
      payload: meaningValence
    }
  },
  updateSuccess(meaningValence){
    return {
      type: types.UPDATE_SUCCESS,
      payload: meaningValence
    }
  },
  updateError(meaningValence){
    return {
      type: types.UPDATE_ERROR,
      payload: meaningValence
    }
  }
}

export function reducer(state = {}, {type, payload}) {
  switch (type) {
    case types.LOAD_SUCCESS:
      return addManyByIdToObject(state, payload)
    case types.CREATE_SUCCESS:
    case types.UPDATE_SUCCESS:
      return addByIdToObject(state, payload)
    case types.REMOVE_SUCCESS:
      return removeFromObjectById(state, payload.id)
    case types.LOAD_ERROR:
      // If the load was to a single object, we declare it as null here
      // to signify that the item does not exist to the caller
      if (payload.meta.single) {
        return {
          ...state,
          [payload.meta.payload]: null
        }
      }
      return state
    case paginator.types.LOAD_SUCCESS:
      const { results } = payload
      return Object.assign(
        {},
        addManyByIdToObject(state, results),
        paginator.reducer(state, {type, payload})
      )
    default:
      return paginator.reducer(state, {type, payload})
  }
}

// SAGAS
function* loadRelated(meaningValence, relatedDepth, parentDepth) {
  try {
    if (relatedDepth) {
      const  _examples  = meaningValence.examples
      yield all(
        (_examples || [])
        .map((meaningId) => put(examples.actions.load(meaningId, {
          loadRelated: relatedDepth-1
        })))
      )
      yield put(valenceframes.actions.load(meaningValence.valenceFrame, {loadRelated: 0}))
    }

    if (parentDepth) {
      yield put(meanings.actions.load(meaningValence.meaning, {loadParents: parentDepth-1}))
    }
  } catch (e) {
    yield put(actions.loadError({
        detail: JSON.stringify((e.response || {}).data || e.toString()),
        title: `Error loading lemma related entities`,
        meta: {}
    }))
  }
}

function* loadMeaningValence(action){
  try {
    if (action.meta.single) {
      const meaningValence = yield call(api.meaningvalences.readSingle, action.payload)
      yield put(actions.loadSuccess([meaningValence]))
      yield call(loadRelated, meaningValence, action.meta.loadRelated, action.meta.loadParents)
    } else {
      const {results} = yield call(api.meaningvalences.readMultiple, action.payload)
      yield put(actions.loadSuccess(results))
    }
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: 'Error loading meaningValence(s)',
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* createMeaningValence(action) {
  try {
    const meaningValenceData = action.payload
    const meaningValence = yield call(api.meaningvalences.create, meaningValenceData)
    yield put(actions.createSuccess(meaningValence))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error creating meaningValence`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* updateMeaningValence(action){
  try {
    const meaningValence = yield call(api.meaningvalences.update, action.payload)
    yield put(actions.updateSuccess(meaningValence))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating meaningValence ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

function* removeMeaningValence(action){
  try {
    yield call(api.meaningvalences.delete, action.payload)
    yield put(actions.removeSuccess(action.payload.id))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating meaningValence ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

export function* saga() {
  yield all([
    takeEvery(types.LOAD, loadMeaningValence),
    takeEvery(types.CREATE, createMeaningValence),
    takeEvery(types.UPDATE, updateMeaningValence),
    takeEvery(types.REMOVE, removeMeaningValence),
    call(paginator.saga)
  ])
}


export default {
  actions,
  constants,
  paginator,
  reducer,
  saga,
  selectors,
  types
}
