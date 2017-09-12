import { all, call } from 'redux-saga/effects'

import users from 'state/users'
import login from 'state/login'
import lemmas from 'state/lemmas'

export default function*() {
  yield all([
    call(users.saga),
    call(login.saga),
    call(lemmas.saga)
  ])
}