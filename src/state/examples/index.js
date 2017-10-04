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

const paginator = pagination('/api/examples/', 'examples', selectors.getAll)

export const initialState = {
}

export const types = {
  LOAD: 'valex/examples/load',
  LOAD_NEXT: 'valex/examples/load-next',
  LOAD_SUCCESS: 'valex/examples/load_success',
  LOAD_ERROR: 'valex/examples/load_error',
  CREATE: 'valex/examples/create',
  CREATE_SUCCESS: 'valex/examples/create_success',
  CREATE_ERROR: 'valex/examples/create_error',
  REMOVE: 'valex/examples/remove',
  REMOVE_SUCCESS: 'valex/examples/remove_success',
  REMOVE_ERROR: 'valex/examples/remove_error',
  UPDATE: 'valex/examples/update',
  UPDATE_SUCCESS: 'valex/examples/update_success',
  UPDATE_ERROR: 'valex/examples/update_error',
  UPDATE_RELATIONSHIP: 'valex/examples/update_relationship',
  REMOVE_RELATIONSHIP: 'valex/examples/remove_relationship'
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
  loadSuccess(examples) {
    return {
      type: types.LOAD_SUCCESS,
      payload: examples
    }
  },
  loadError(error) {
    return {
      type: types.LOAD_ERROR,
      payload: error
    }
  },
  create(example) {
    return {
      type: types.CREATE,
      payload: example
    }
  },
  createSuccess(example) {
    return {
      type: types.CREATE_SUCCESS,
      payload: example
    }
  },
  createError(example) {
    return {
      type: types.CREATE_ERROR,
      payload: example
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
  update(example){
    return {
      type: types.UPDATE,
      payload: example
    }
  },
  updateSuccess(example){
    return {
      type: types.UPDATE_SUCCESS,
      payload: example
    }
  },
  updateError(example){
    return {
      type: types.UPDATE_ERROR,
      payload: example
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
function* loadExample(action){
  try {
    if (action.meta.single) {
      const example = yield call(api.examples.readSingle, action.payload)
      yield put(actions.loadSuccess([example]))
    } else {
      const {results} = yield call(api.examples.readMultiple, action.payload)
      yield put(actions.loadSuccess(results))
    }
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: 'Error loading example(s)',
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* createExample(action) {
  try {
    const exampleData = action.payload
    const example = yield call(api.examples.create, exampleData)
    yield put(actions.createSuccess(example))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error creating example`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}


function* updateExample(action){
  try {
    const example = yield call(api.examples.update, action.payload)
    yield put(actions.updateSuccess(example))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating example ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

function* removeExample(action){
  try {
    yield call(api.examples.delete, action.payload)
    yield put(actions.removeSuccess(action.payload.id))
  } catch (e) {
    yield put(actions.loadError({
      detail: JSON.stringify(e.response.data),
      title: `Error updating example ${action.payload.id}`,
      meta: {...action.meta, payload: action.payload}
    }))
  }
}

export function* saga() {
  yield all([
    takeEvery(types.LOAD, loadExample),
    takeEvery(types.CREATE, createExample),
    takeEvery(types.UPDATE, updateExample),
    takeEvery(types.REMOVE, removeExample),
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
