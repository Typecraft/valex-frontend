import axios from 'axios'

export function login(username, password) {
  return axios.post('/login/', {
    username,
    password
  }).then(result => result.data)
}

export function logout() {
  return axios.get('/logout/')
}

export default{
  login,
  logout
}
