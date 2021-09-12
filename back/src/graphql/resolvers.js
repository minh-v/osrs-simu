const Monster = require("../db/models/monster")

//Monster.find({}).then((res) => console.log(res))
const resolvers = {
  Query: {
    monsters: () => {
      return Monster.find({}).then((res) => res)
    },
  },
}
//why this but not module.exports = {resolvers}
module.exports = resolvers
