import axios from 'axios'
import { configureSearchParams } from '../util'

export default {
  readSingle(id) {
    return axios.get(`/api/examples/${id}`)
      .then(data => data.data)
  },
  readMultiple(config) {
    return axios.get(`/api/examples/${configureSearchParams(config)}`)
      .then(data => data.data)
  },
  update(object, method="PATCH") {
    if (method === "PATCH") {
      return axios.patch(`/api/examples/${object.id}/`, object)
        .then(data => data.data)
    }
    return axios.put(`/api/examples/${object.id}/`, object)
      .then(data => data.data)
  },
  create(object) {
    return axios.post(`/api/examples/`, object)
      .then(data => data.data)
  },
  delete(object) {
    return axios.delete(`/api/examples/${object.id || object}/`)
  }
}
