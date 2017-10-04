import axios from 'axios'
import { configureSearchParams } from '../util'

export default {
  readSingle(id) {
    return axios.get(`/api/lemmas/${id}`)
      .then(data => data.data)
  },
  readMultiple(config) {
    return axios.get(`/api/lemmas/${configureSearchParams(config)}`)
      .then(data => data.data)
  },
  readOfTheDay() {
    return axios.get('/api/lemma-of-the-day/').then(data => data.data)
  },
  update(object, method="PATCH") {
    if (method === "PATCH") {
      return axios.patch(`/api/lemmas/${object.id}/`, object)
        .then(data => data.data)
    }
    return axios.put(`/api/lemmas/${object.id}/`, object)
      .then(data => data.data)
  },
  create(object) {
    return axios.post(`/api/lemmas/`, object)
      .then(data => data.data)
  },
  delete(object) {
    return axios.delete(`/api/lemmas/${object.id || object}/`)
  }
}
