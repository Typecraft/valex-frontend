import {  call, all, takeEvery, put } from 'redux-saga/effects'

import * as selectors from './selectors'
import * as constants from './constants'

import {
  addByIdToObject,
  addManyByIdToObject,
  removeFromObjectById
} from '../util'

import api from 'api'
import pagination from 'state/pagination'

const paginator = pagination('/api/valence-frames/', 'valenceframes', selectors.getAll)

export const initialState = {
}

export const types = {
  LOAD: 'valex/valenceframes/load',
  LOAD_NEXT: 'valex/valenceframes/load-next',
  LOAD_SUCCESS: 'valex/valenceframes/load_success',
  LOAD_ERROR: 'valex/valenceframes/load_error',
  CREATE: 'valex/valenceframes/create',
  CREATE_SUCCESS: 'valex/valenceframes/create_success',
  CREATE_ERROR: 'valex/valenceframes/create_error',
  REMOVE: 'valex/valenceframes/remove',
  REMOVE_SUCCESS: 'valex/valenceframes/remove_success',
  REMOVE_ERROR: 'valex/valenceframes/remove_error',
  UPDATE: 'valex/valenceframes/update',
  UPDATE_SUCCESS: 'valex/valenceframes/update_success',
  UPDATE_ERROR: 'valex/valenceframes/update_error',
  UPDATE_RELATIONSHIP: 'valex/valenceframes/update_relationship',
  REMOVE_RELATIONSHIP: 'valex/valenceframes/remove_relationship'
}

export const actions = {
  load(config, {multiple=false, loadRelated=0} = {}) {
    return {
      type: types.LOAD,
      payload: config,
      meta: {
        single: !multiple,
        multiple,
        loadRelated
      }
    }
  },
  loadSuccess(valenceframes) {
    return {
      type: types.LOAD_SUCCESS,
      payload: valenceframes
    }
  },
  loadError(error) {
    return {
      type: types.LOAD_ERROR,
      payload: error
    }
  },
  create(valenceFrame) {
    return {
      type: types.CREATE,
      payload: valenceFrame
    }
  },
  createSuccess(valenceFrame) {
    return {
      type: types.CREATE_SUCCESS,
      payload: valenceFrame
    }
  },
  createError(valenceFrame) {
    return {
      type: types.CREATE_ERROR,
      payload: valenceFrame
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
  update(valenceFrame){
    return {
      type: types.UPDATE,
      payload: valenceFrame
    }
  },
  updateSuccess(valenceFrame){
    return {
      type: types.UPDATE_SUCCESS,
      payload: valenceFrame
    }
  },
  updateError(valenceFrame){
    return {
      type: types.UPDATE_ERROR,
      payload: valenceFrame
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
function* loadValenceFrame(action){
  try {
    if (action.meta.single) {
      const valenceFrame = yield call(api.valenceframes.readSingle, action.payload)
      yield put(actions.loadSuccess([valenceFrame]))
    } else {
      const {results} = yield call(api.valenceframes.readMultiple, action.payload)
      yield put(actions.loadSuccess(results))
    }
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: 'Error loading valenceFrame(s)',
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* createValenceFrame(action) {
  try {
    const valenceFrameData = action.payload
    const valenceFrame = yield call(api.valenceframes.create, valenceFrameData)
    yield put(actions.createSuccess(valenceFrame))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error creating valenceFrame`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* updateValenceFrame(action){
  try {
    const valenceFrame = yield call(api.valenceframes.update, action.payload)
    yield put(actions.updateSuccess(valenceFrame))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating valenceFrame ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

function* removeValenceFrame(action){
  try {
    yield call(api.valenceframes.delete, action.payload)
    yield put(actions.removeSuccess(action.payload.id))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating valenceFrame ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

export function* saga() {
  yield all([
    takeEvery(types.LOAD, loadValenceFrame),
    takeEvery(types.CREATE, createValenceFrame),
    takeEvery(types.UPDATE, updateValenceFrame),
    takeEvery(types.REMOVE, removeValenceFrame),
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
