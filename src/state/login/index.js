
const initialState = {
  loggedIn: false
}

export const types = {
  LOGIN: 'valex/login/login',
  LOGOUT: 'valex/login/logout'
}

export const actions = {
  login() {
    return {
      type: types.LOGIN
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
    case types.LOGIN:
      return {...state, loggedIn: true}
    case types.LOGOUT:
      return {...state, loggedIn: false}
    default:
      return state
  }
}

export default {
  types,
  actions,
  reducer
}