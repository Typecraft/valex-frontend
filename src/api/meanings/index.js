import axios from 'axios'
import { configureSearchParams } from '../util'

export default {
  readSingle(id) {
    return axios.get(`/api/meanings/${id}/`)
      .then(data => data.data)
  },
  readMultiple(config) {
    return axios.get(`/api/meanings/${configureSearchParams(config)}`)
      .then(data => data.data)
  },
  update(object, method="PATCH") {
    if (method === "PATCH") {
      return axios.patch(`/api/meanings/${object.id}/`, object)
        .then(data => data.data)
    }
    return axios.put(`/api/meanings/${object.id}/`, object)
      .then(data => data.data)
  },
  create(object) {
    return axios.post(`/api/meanings/`, object)
      .then(data => data.data)
  },
  delete(object) {
    return axios.delete(`/api/meanings/${object.id || object}/`)
  }
}
