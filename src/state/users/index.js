import api from 'api'

import { call, put, all, takeEvery } from 'redux-saga/effects'
import { addManyByIdToObject, addByIdToObject } from '../util'

import * as selectors from './selectors'

export const initialState =  {
  current: -1,
  all: {

  }
}

export const types = {
  LOAD: 'valex/users/load',
  LOAD_SUCCESS: 'valex/users/load-success',
  LOAD_ERROR: 'valex/users/load-error',
  LOAD_CURRENT_SUCCESS: 'valex/users/load-current-success',
  UPDATE: 'valex/users/update',
  UPDATE_SUCCESS: 'valex/users/update-success',
  UPDATE_ERROR: 'valex/users/update-error'
}

export const actions = {
  loadCurrent() {
    return {
      type: types.LOAD,
      meta: {
        current: true
      }
    }
  },
  loadSingle() {
    return {
      type: types.LOAD,
      meta: {
        single: true
      }
    }
  },
  loadMultiple(config) {
    return {
      type: types.LOAD,
      payload: config
    }
  },
  loadError(data) {
    return {
      type: types.LOAD_ERROR,
      payload: data
    }
  },
  loadCurrentSuccess(current) {
    return {
      type: types.LOAD_CURRENT_SUCCESS,
      payload: current
    }
  },
  loadSuccess(results) {
    return {
      type: types.LOAD_SUCCESS,
      payload: results
    }
  },
  update(user) {
    return {
      type: types.UPDATE,
      payload: user
    }
  },
  updateSuccess(user) {
    return {
      type: types.UPDATE_SUCCESS,
      payload: user
    }
  },
  updateError(data) {
    return {
      type: types.UPDATE_ERROR,
      payload: data
    }
  },
}

export function reducer(state = initialState, {type, payload}) {
  switch (type) {
    case types.LOAD_SUCCESS:
      return {
        ...state,
        all: addManyByIdToObject(state.all, payload)
      }
    case types.LOAD_CURRENT_SUCCESS:
      return {
        ...state,
        current: payload.id,
        all: addByIdToObject(state.all, payload)
      }
    case types.UPDATE_SUCCESS:
      return {
        ...state,
        all: addByIdToObject(state.all, payload)
      }
    default:
      return state
  }
}

function* loadUser(action) {
  try{
    if (action.meta.current) {
      const user = yield call(api.users.loadCurrent)
      yield put(actions.loadCurrentSuccess(user))
    } else if (action.meta.single) {
      const user = yield call(api.users.loadSingle, action.payload)
      yield put(actions.loadSuccess([user]))
    } else {
      const users = yield call(api.users.loadMultiple, action.payload)
      yield put(actions.loadSuccess(users))
    }
  } catch (e) {
    console.log(e.toString())
    yield put(actions.loadError())
  }
}

function* updateUser(action) {
  try {
    const user = yield call(api.users.update, action.payload)
    yield put(actions.updateSuccess(user))
  } catch (e) {
    yield put(actions.updateError())
  }
}

export function* saga() {
  yield all([
    takeEvery(types.LOAD, loadUser),
    takeEvery(types.UPDATE, updateUser)
  ])
}

export default {
  types,
  actions,
  reducer,
  saga,
  selectors
}