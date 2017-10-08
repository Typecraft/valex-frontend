import axios from 'axios'
import { configureSearchParams } from '../util'

export default {
  readSingle(id) {
    return axios.get(`/api/meaning-valences/${id}/`)
      .then(data => data.data)
  },
  readMultiple(config) {
    return axios.get(`/api/meaning-valences/${configureSearchParams(config)}`)
      .then(data => data.data)
  },
  update(object, method="PATCH") {
    if (method === "PATCH") {
      return axios.patch(`/api/meaning-valences/${object.id}/`, object)
        .then(data => data.data)
    }
    return axios.put(`/api/meaning-valences/${object.id}/`, object)
      .then(data => data.data)
  },
  create(object) {
    return axios.post(`/api/meaning-valences/`, object)
      .then(data => data.data)
  },
  delete(object) {
    return axios.delete(`/api/meaning-valences/${object.id || object}/`)
  }
}
