import { all, call } from 'redux-saga/effects'

import users from 'state/users'
import login from 'state/login'
import lemmas from 'state/lemmas'
import meanings from 'state/meanings'
import valenceframes from 'state/valenceframes'
import meaningvalences from 'state/meaningvalences'
import examples from 'state/examples'

export default function*() {
  yield all([
    call(users.saga),
    call(login.saga),
    call(lemmas.saga),
    call(meanings.saga),
    call(meaningvalences.saga),
    call(valenceframes.saga),
    call(examples.saga),
  ])
}