const mongoose = require("mongoose")

const monsterSchema = mongoose.Schema({
  name: String,
  id: String,
  drops: Array,
  examine: String,
  combat_level: Number,
  hipoints: Number,
  max_hit: Number,
})

monsterSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Monster", monsterSchema)
