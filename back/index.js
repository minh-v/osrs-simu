const { ApolloServer } = require("apollo-server")
const connect = require("./src/connect")
const cors = require("cors")
//const Monster = require("./src/db/models/monster")
const typeDefs = require("./src/graphql/typeDefs")
const resolvers = require("./src/graphql/resolvers")
require("dotenv").config()

//how to determine if you want to search from the api itself, or host it's data on your own db/server?
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen({ port: process.env.PORT || 3001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})

//express server
// const app = express()
// app.use(cors())

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!</h1>")
// })

// app.get("/api/monsters", (req, res) => {
//   Monster.find({}).then((monsters) => {
//     res.json(monsters)
//   })
// })

// app.get("/api/monsters/:id", (req, res) => {
//   Monster.find({ id: req.params.id }).then((monster) => res.json(monster))
// })

// const PORT = process.env.PORT || 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })
