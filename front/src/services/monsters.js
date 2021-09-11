import axios from "axios"
import { gql, useQuery } from "@apollo/client"
//test
const baseUrl = "http://localhost:4000/graphql"
const monsters = gql`
  query {
    monsters {
      name
      id
      drops
      examine
    }
  }
`

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then((res) => res.data)
}

export default { getAll }
