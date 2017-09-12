import { all, call } from 'redux-saga/effects'

import users from 'state/users'
import login from 'state/login'

export default function*() {
  yield all([
    call(users.saga),
    call(login.saga)
  ])
}