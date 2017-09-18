import axios from 'axios'
import users from './users'
import lemmas from './lemmas'
import meanings from './meanings'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'
axios.defaults.headers.patch['Content-Type'] = 'application/json'

export async function getAndSetApiKey() {
  try {
    const result = await axios.post('/api/api-token-auth-session/')
    axios.defaults.headers.common['Authorization'] = 'Token ' + result.data.token
    return true
  } catch (e) {
    return false
  }
}

export default {
  getAndSetApiKey,
  users,
  lemmas,
  meanings
}
