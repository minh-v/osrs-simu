import axios from "axios"
//test
const baseUrl = "http://localhost:3001/api/monsters"

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => res.data)
}

export default { getAll }
