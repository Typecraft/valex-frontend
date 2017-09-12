import { select, call, all, takeEvery, put } from 'redux-saga/effects'

import * as selectors from './selectors'
import * as constants from './constants'

import {
  addByIdToObject,
  addManyByIdToObject,
  removeFromObjectById
} from '../util'

import api from 'api'

export const initialState = {
}

export const types = {
  LOAD: '$${projectName}/$${moduleName}/load',
  LOAD_NEXT: '$${projectName}/$${moduleName}/load-next',
  LOAD_SUCCESS: '$${projectName}/$${moduleName}/load_success',
  LOAD_ERROR: '$${projectName}/$${moduleName}/load_error',
  CREATE: '$${projectName}/$${moduleName}/create',
  CREATE_SUCCESS: '$${projectName}/$${moduleName}/create_success',
  CREATE_ERROR: '$${projectName}/$${moduleName}/create_error',
  REMOVE: '$${projectName}/$${moduleName}/remove',
  REMOVE_SUCCESS: '$${projectName}/$${moduleName}/remove_success',
  REMOVE_ERROR: '$${projectName}/$${moduleName}/remove_error',
  UPDATE: '$${projectName}/$${moduleName}/update',
  UPDATE_SUCCESS: '$${projectName}/$${moduleName}/update_success',
  UPDATE_ERROR: '$${projectName}/$${moduleName}/update_error',
  UPDATE_RELATIONSHIP: '$${projectName}/$${moduleName}/update_relationship',
  REMOVE_RELATIONSHIP: '$${projectName}/$${moduleName}/remove_relationship'
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
  loadSuccess($${moduleName}) {
    return {
      type: types.LOAD_SUCCESS,
      payload: $${moduleName}
    }
  },
  loadError(error) {
    return {
      type: types.LOAD_ERROR,
      payload: error
    }
  },
  create($${singularName}) {
    return {
      type: types.CREATE,
      payload: $${singularName}
    }
  },
  createSuccess($${singularName}) {
    return {
      type: types.CREATE_SUCCESS,
      payload: $${singularName}
    }
  },
  createError($${singularName}) {
    return {
      type: types.CREATE_ERROR,
      payload: $${singularName}
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
  update($${singularName}){
    return {
      type: types.UPDATE,
      payload: $${singularName}
    }
  },
  updateSuccess($${singularName}){
    return {
      type: types.UPDATE_SUCCESS,
      payload: $${singularName}
    }
  },
  updateError($${singularName}){
    return {
      type: types.UPDATE_ERROR,
      payload: $${singularName}
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
function* load$${singularNameCamelCased}(action){
  try {
    if (action.meta.single) {
      const $${singularName} = yield call(api.$${moduleName}.readSingle, action.payload)
      yield put(actions.loadSuccess([$${singularName}]))
    } else {
      const {results} = yield call(api.$${moduleName}.readMultiple, action.payload)
      yield put(actions.loadSuccess(results))
    }
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: 'Error loading $${singularName}(s)',
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* create$${singularNameCamelCased}(action) {
  try {
    const $${singularName}Data = action.payload
    const $${singularName} = yield call(api.$${moduleName}.create, $${singularName}Data)
    yield put(actions.createSuccess($${singularName}))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error creating $${singularName}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* update$${singularNameCamelCased}(action){
  try {
    const $${singularName} = yield call(api.$${moduleName}.update, action.payload)
    yield put(actions.updateSuccess($${singularName}))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating $${singularName} ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

function* remove$${singularNameCamelCased}(action){
  try {
    yield call(api.$${moduleName}.delete, action.payload)
    yield put(actions.removeSuccess(action.payload.id))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating $${singularName} ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

export function* saga() {
  yield all([
    takeEvery(types.LOAD, load$${singularNameCamelCased}),
    takeEvery(types.CREATE, create$${singularNameCamelCased}),
    takeEvery(types.UPDATE, update$${singularNameCamelCased}),
    takeEvery(types.REMOVE, remove$${singularNameCamelCased})
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
