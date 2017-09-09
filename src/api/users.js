import axios from 'axios'
import { configureSearchParams } from './util'

function loadCurrent() {
  return axios.get(`/api/users/current/`)
    .then(data => data.data)
}

function loadSingle(id) {
  return axios.get(`/api/users/${id}/`)
    .then(data => data.data)
}

function loadMultiple(config) {
  return axios.get(`/api/users/${configureSearchParams(config)}`)
    .then(data => data.data)
}

function loadNext(url) {
  return axios.get(url)
    .then(data => data)
}

function update(data) {
  return axios.patch(`/api/users/${data.id}/`, data)
    .then(data => data.data)
}

export default {
  loadCurrent,
  loadSingle,
  loadMultiple,
  loadNext,
  update,
}