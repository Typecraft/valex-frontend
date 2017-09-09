import { all, call } from 'redux-saga/effects'

import users from 'state/users'

export default function*() {
  yield all([
    call(users.saga)
  ])
}