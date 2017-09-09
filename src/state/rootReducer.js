import { combineReducers } from 'redux'

import users from 'state/users'

export default combineReducers({
  users: users.reducer
})
