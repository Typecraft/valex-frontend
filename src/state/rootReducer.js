import { combineReducers } from 'redux'

import users from 'state/users'
import login from 'state/login'
import lemmas from 'state/lemmas'
import meanings from 'state/meanings'
import valenceframes from 'state/valenceframes'
import meaningvalences from 'state/meaningvalences'
import examples from 'state/examples'

export default combineReducers({
  users: users.reducer,
  login: login.reducer,
  [lemmas.constants.NAME]: lemmas.reducer,
  [meanings.constants.NAME]: meanings.reducer,
  [valenceframes.constants.NAME]: valenceframes.reducer,
  [meaningvalences.constants.NAME]: meaningvalences.reducer,
  [examples.constants.NAME]: examples.reducer,
})
