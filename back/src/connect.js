const mongoose = require("mongoose")
require("dotenv").config()

const mongoUrl = process.env.MONGODB_URI

mongoose
  .connect(mongoUrl)
  .then((result) => console.log("connected to MongoDB"))
  .catch((error) => console.log("error connecting to MongoDB", error))
