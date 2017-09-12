import axios from 'axios'

export function login(username, password) {
  console.log(username, password);
  return axios.post('/login/', {
    username,
    password
  }).then(result => result.data)
}

export default{
  login
}
