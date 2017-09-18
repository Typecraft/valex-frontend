import { select, call, all, takeEvery, put } from 'redux-saga/effects'

import * as selectors from './selectors'
import * as constants from './constants'

import {
  addByIdToObject,
  addManyByIdToObject,
  removeFromObjectById
} from '../util'

import api from 'api'
import {
  withSelectors,
  default as pagination
} from 'state/pagination'

const paginator = pagination('/api/meanings/', 'meanings', 'meanings')

export const initialState = {
}

export const types = {
  LOAD: 'valex/meanings/load',
  LOAD_NEXT: 'valex/meanings/load-next',
  LOAD_SUCCESS: 'valex/meanings/load_success',
  LOAD_ERROR: 'valex/meanings/load_error',
  CREATE: 'valex/meanings/create',
  CREATE_SUCCESS: 'valex/meanings/create_success',
  CREATE_ERROR: 'valex/meanings/create_error',
  REMOVE: 'valex/meanings/remove',
  REMOVE_SUCCESS: 'valex/meanings/remove_success',
  REMOVE_ERROR: 'valex/meanings/remove_error',
  UPDATE: 'valex/meanings/update',
  UPDATE_SUCCESS: 'valex/meanings/update_success',
  UPDATE_ERROR: 'valex/meanings/update_error',
  UPDATE_RELATIONSHIP: 'valex/meanings/update_relationship',
  REMOVE_RELATIONSHIP: 'valex/meanings/remove_relationship'
}

export const actions = {
  load(config, multiple=false) {
    return {
      type: types.LOAD,
      payload: config,
      meta: {
        single: !multiple,
        multiple
      }
    }
  },
  loadSuccess(meanings) {
    return {
      type: types.LOAD_SUCCESS,
      payload: meanings
    }
  },
  loadError(error) {
    return {
      type: types.LOAD_ERROR,
      payload: error
    }
  },
  create(meaning) {
    return {
      type: types.CREATE,
      payload: meaning
    }
  },
  createSuccess(meaning) {
    return {
      type: types.CREATE_SUCCESS,
      payload: meaning
    }
  },
  createError(meaning) {
    return {
      type: types.CREATE_ERROR,
      payload: meaning
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
  update(meaning){
    return {
      type: types.UPDATE,
      payload: meaning
    }
  },
  updateSuccess(meaning){
    return {
      type: types.UPDATE_SUCCESS,
      payload: meaning
    }
  },
  updateError(meaning){
    return {
      type: types.UPDATE_ERROR,
      payload: meaning
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
function* loadMeaning(action){
  try {
    if (action.meta.single) {
      const meaning = yield call(api.meanings.readSingle, action.payload)
      yield put(actions.loadSuccess([meaning]))
    } else {
      const {results} = yield call(api.meanings.readMultiple, action.payload)
      yield put(actions.loadSuccess(results))
    }
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: 'Error loading meaning(s)',
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* createMeaning(action) {
  try {
    const meaningData = action.payload
    const meaning = yield call(api.meanings.create, meaningData)
    yield put(actions.createSuccess(meaning))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error creating meaning`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* updateMeaning(action){
  try {
    const meaning = yield call(api.meanings.update, action.payload)
    yield put(actions.updateSuccess(meaning))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating meaning ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

function* removeMeaning(action){
  try {
    yield call(api.meanings.delete, action.payload)
    yield put(actions.removeSuccess(action.payload.id))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating meaning ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

export function* saga() {
  yield all([
    takeEvery(types.LOAD, loadMeaning),
    takeEvery(types.CREATE, createMeaning),
    takeEvery(types.UPDATE, updateMeaning),
    takeEvery(types.REMOVE, removeMeaning),
    call(paginator.saga)
  ])
}


export default {
  actions,
  constants,
  reducer,
  saga,
  selectors: withSelectors(selectors, state => state.meanings.pagination),
  types,
  paginator
}
