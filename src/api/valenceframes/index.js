import axios from 'axios'
import { configureSearchParams } from '../util'

export default {
  readSingle(id) {
    return axios.get(`/api/valence-frames/${id}`)
      .then(data => data.data)
  },
  readMultiple(config) {
    return axios.get(`/api/valence-frames/${configureSearchParams(config)}`)
      .then(data => data.data)
  },
  update(object, method="PATCH") {
    if (method === "PATCH") {
      return axios.patch(`/api/valence-frames/${object.id}/`, object)
        .then(data => data.data)
    }
    return axios.put(`/api/valence-frames/${object.id}/`, object)
      .then(data => data.data)
  },
  create(object) {
    return axios.post(`/api/valence-frames/`, object)
      .then(data => data.data)
  },
  delete(object) {
    return axios.delete(`/api/valence-frames/${object.id || object}/`)
  }
}
