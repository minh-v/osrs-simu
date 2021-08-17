import axios from "axios"
//test
const baseUrl = "https://api.osrsbox.com/"

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => res.data)
}

//paginated api
const fetchData = (url, prevResponse = []) => {
  return axios
    .get(url)
    .then((res) => res.data)
    .then((newResponse) => {
      const response = [...prevResponse, ...newResponse._items]
      if (newResponse._links.next !== undefined) {
        let nextUrl = `https://api.osrsbox.com/${newResponse._links.next.href}`
        return fetchData(nextUrl, response)
      }

      return response
    })
}

export default { getAll, fetchData }
