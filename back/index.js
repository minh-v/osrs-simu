import { ApolloServer } from "apollo-server-express"
const connect = require("./src/connect")
const cors = require("cors")
//const Monster = require("./src/db/models/monster")
const typeDefs = require("./src/graphql/typeDefs")
const resolvers = require("./src/graphql/resolvers")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.static("build"))

//how to determine if you want to search from the api itself, or host it's data on your own db/server?
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.applyMiddleware({ app })

app.listen({ port: process.env.PORT || 3001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
