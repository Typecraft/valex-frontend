import { combineReducers } from 'redux'

import users from 'state/users'
import login from 'state/login'
import lemmas from 'state/lemmas'

export default combineReducers({
  users: users.reducer,
  login: login.reducer,
  [lemmas.constants.NAME]: lemmas.reducer
})
