import axios from 'axios'
import { configureSearchParams } from '../util'

export default {
  readSingle(id) {
    return axios.get(`$${apiEndpointPrefix}/${id}`)
      .then(data => data.data)
  },
  readMultiple(config) {
    return axios.get(`$${apiEndpointPrefix}/${configureSearchParams(config)}`)
      .then(data => data.data)
  },
  update(object, method="PATCH") {
    if (method === "PATCH") {
      return axios.patch(`$${apiEndpointPrefix}/${object.id}/`, object)
        .then(data => data.data)
    }
    return axios.put(`$${apiEndpointPrefix}/${object.id}/`, object)
      .then(data => data.data)
  },
  create(object) {
    return axios.post(`$${apiEndpointPrefix}/`, object)
      .then(data => data.data)
  },
  delete(object) {
    return axios.delete(`$${apiEndpointPrefix}/${object.id || object}/`)
  }
}
