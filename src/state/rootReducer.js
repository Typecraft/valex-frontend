import { combineReducers } from 'redux'

import users from 'state/users'
import login from 'state/login'

export default combineReducers({
  users: users.reducer,
  login: login.reducer
})
