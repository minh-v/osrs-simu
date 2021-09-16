const ApolloServer = require("apollo-server-express")
const ApolloServerPluginDrainHttpServer = require("apollo-server-core")
const connect = require("./src/connect")
const cors = require("cors")
const express = require("express")
const http = require("http")
const typeDefs = require("./src/graphql/typeDefs")
const resolvers = require("./src/graphql/resolvers")
require("dotenv").config()

// const app = express()
// app.use(cors())
// app.use(express.static("build"))

// //how to determine if you want to search from the api itself, or host it's data on your own db/server?
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })

// server.applyMiddleware({ app })

// app.listen({ port: process.env.PORT || 3001 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`)
// })

async function startApolloServer(typeDefs, resolvers) {
  const app = express()

  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  app.use(cors())
  app.use(express.static("build"))
  server.applyMiddleware({ app, cors: true })
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 3001 }, resolve)
  )
  console.log(`🚀 Server ready at ${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
