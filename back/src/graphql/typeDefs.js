const { gql } = require("apollo-server")

const typeDefs = gql`
  type Monster {
    name: String!
    id: ID!
    drops: [Drop]
    examine: String
  }

  type Drop {
    id: ID!
    name: String!
    quantity: String!
    rarity: Float
    rolls: Int
    price: Float
  }

  type Query {
    allMonsters: [Monster!]!
  }
`

module.exports = gql`
  type Monster {
    name: String!
    id: ID!
    drops: [Drop]
    examine: String
    combat_level: Int
    hitpoints: Int
    max_hit: Int
  }

  type Drop {
    id: ID!
    name: String!
    quantity: String
    rarity: Float
    rolls: Int
    price: Float
  }

  type Query {
    monsters: [Monster!]!
  }
`
