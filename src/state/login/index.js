import api from 'api/login'
import rootApi from 'api'

import * as selectors from './selectors';

import { call, all, takeEvery, put } from 'redux-saga/effects'

const initialState = {
  loggedIn: false,
  loggedInErrors: null
}

export const types = {
  ATTEMPT_LOGIN: 'valex/login/attempt-login',
  LOGIN_FAILED: 'valex/login/attempt-failed',
  LOGIN_SUCCESS: 'valex/login/login',
  LOGOUT: 'valex/login/logout'
}

export const actions = {
  attemptLogin(username, password) {
    return {
      type: types.ATTEMPT_LOGIN,
      payload: {
        username,
        password
      }
    }
  },
  loginFailed(errors)  {
    return {
      type: types.LOGIN_FAILED,
      payload: errors
    }
  },
  login() {
    return {
      type: types.LOGIN_SUCCESS
    }
  },
  logout() {
    return {
      type: types.LOGOUT
    }
  }
}

export function reducer(state = initialState, {type}) {
  switch (type) {
    case types.LOGIN_SUCCESS:
      return {...state, loggedIn: true, loggedInErrors: null}
    case types.LOGOUT:
      return {...state, loggedIn: false, loggedInErrors: null}
    default:
      return state
  }
}

function* attemptLogin(action) {
  try {
    const { username, password } = action.payload
    yield api.login(username, password)
    yield rootApi.getAndSetApiKey()
    yield put(actions.login())
  } catch (e) {
    yield put(actions.loginFailed(e.toString()))
  }
}

function* saga() {
  yield all([
    takeEvery(types.ATTEMPT_LOGIN, attemptLogin)
  ])
}

export default {
  types,
  actions,
  reducer,
  saga,
  selectors
}