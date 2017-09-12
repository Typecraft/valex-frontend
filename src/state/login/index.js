import api from 'api/login'
import rootApi from 'api'

import * as selectors from './selectors';

import { call, all, takeEvery, put } from 'redux-saga/effects'

import users from 'state/users'

const initialState = {
  loggedIn: false,
  loggedInErrors: null
}

export const types = {
  ATTEMPT_LOGIN: 'valex/login/attempt-login',
  LOGIN_FAILED: 'valex/login/attempt-login-failed',
  LOGIN_SUCCESS: 'valex/login/login',
  ATTEMPT_LOGOUT: 'valex/login/attempt-logout',
  LOGOUT_FAILED: 'valex/login/attempt-logout-failed',
  LOGOUT: 'valex/login/logout'
}

export const actions = {
  attemptLogout() {
    return {
      type: types.ATTEMPT_LOGOUT
    }
  },
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
  },
  logoutFailed(errors) {
    return {
      type: types.LOGOUT_FAILED,
      payload: errors
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
    yield call(api.login, username, password)
    yield call(rootApi.getAndSetApiKey)
    yield put(users.actions.loadCurrent())
    yield put(actions.login())
  } catch (e) {
    yield put(actions.loginFailed(e.toString()))
  }
}

function* attemptLogout(action) {
  try {
    yield call(api.logout)
    yield put(actions.logout())
    yield put(users.actions.resetCurrent())
  } catch (e) {
    // This is bad, we are unable to logout
    yield put(actions.logoutFailed(e.toString()))
  }
}

function* saga() {
  yield all([
    takeEvery(types.ATTEMPT_LOGIN, attemptLogin),
    takeEvery(types.ATTEMPT_LOGOUT, attemptLogout),
  ])
}

export default {
  types,
  actions,
  reducer,
  saga,
  selectors
}