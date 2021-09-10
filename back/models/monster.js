const mongoose = require("mongoose")
require("dotenv").config()

//move this to .env later
const mongoUrl = process.env.MONGODB_URI

mongoose
  .connect(mongoUrl)
  .then((result) => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB", error))

const monsterSchema = mongoose.Schema({
  name: String,
  id: String,
  drops: Array,
})

monsterSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model("Monster", monsterSchema)
