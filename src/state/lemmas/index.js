import { select, call, all, takeEvery, put } from 'redux-saga/effects'

import * as selectors from './selectors'
import * as constants from './constants'

import {
  addByIdToObject,
  addManyByIdToObject,
  removeFromObjectById
} from '../util'

import api from 'api/lemmas'

export const initialState = {
}

export const types = {
  LOAD: 'valex/lemmas/load',
  LOAD_NEXT: 'valex/lemmas/load-next',
  LOAD_SUCCESS: 'valex/lemmas/load_success',
  LOAD_ERROR: 'valex/lemmas/load_error',
  CREATE: 'valex/lemmas/create',
  CREATE_SUCCESS: 'valex/lemmas/create_success',
  CREATE_ERROR: 'valex/lemmas/create_error',
  REMOVE: 'valex/lemmas/remove',
  REMOVE_SUCCESS: 'valex/lemmas/remove_success',
  REMOVE_ERROR: 'valex/lemmas/remove_error',
  UPDATE: 'valex/lemmas/update',
  UPDATE_SUCCESS: 'valex/lemmas/update_success',
  UPDATE_ERROR: 'valex/lemmas/update_error',
  UPDATE_RELATIONSHIP: 'valex/lemmas/update_relationship',
  REMOVE_RELATIONSHIP: 'valex/lemmas/remove_relationship'
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
  loadSuccess(lemmas) {
    return {
      type: types.LOAD_SUCCESS,
      payload: lemmas
    }
  },
  loadError(error) {
    return {
      type: types.LOAD_ERROR,
      payload: error
    }
  },
  create(lemma) {
    return {
      type: types.CREATE,
      payload: lemma
    }
  },
  createSuccess(lemma) {
    return {
      type: types.CREATE_SUCCESS,
      payload: lemma
    }
  },
  createError(lemma) {
    return {
      type: types.CREATE_ERROR,
      payload: lemma
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
  update(lemma){
    return {
      type: types.UPDATE,
      payload: lemma
    }
  },
  updateSuccess(lemma){
    return {
      type: types.UPDATE_SUCCESS,
      payload: lemma
    }
  },
  updateError(lemma){
    return {
      type: types.UPDATE_ERROR,
      payload: lemma
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
    default:
      return state
  }
}

// SAGAS
function* loadLemma(action){
  try {
    if (action.meta.single) {
      const lemma = yield call(api.lemmas.readSingle, action.payload)
      yield put(actions.loadSuccess([lemma]))
    } else {
      const {results} = yield call(api.lemmas.readMultiple, action.payload)
      yield put(actions.loadSuccess(results))
    }
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: 'Error loading lemma(s)',
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* createLemma(action) {
  try {
    const lemmaData = action.payload
    const lemma = yield call(api.lemmas.create, lemmaData)
    yield put(actions.createSuccess(lemma))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error creating lemma`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* updateLemma(action){
  try {
    const lemma = yield call(api.lemmas.update, action.payload)
    yield put(actions.updateSuccess(lemma))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating lemma ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

function* removeLemma(action){
  try {
    yield call(api.lemmas.delete, action.payload)
    yield put(actions.removeSuccess(action.payload.id))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating lemma ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

export function* saga() {
  yield all([
    takeEvery(types.LOAD, loadLemma),
    takeEvery(types.CREATE, createLemma),
    takeEvery(types.UPDATE, updateLemma),
    takeEvery(types.REMOVE, removeLemma)
  ])
}


export default {
  actions,
  constants,
  reducer,
  saga,
  selectors,
  types
}
