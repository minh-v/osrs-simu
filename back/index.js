const express = require("express")
const cors = require("cors")
const Monster = require("./models/monster")

const app = express()
app.use(cors())

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>")
})

app.get("/api/monsters", (req, res) => {
  Monster.find({}).then((monsters) => {
    res.json(monsters)
  })
})

app.get("/api/monsters/:id", (req, res) => {
  Monster.find({ id: req.params.id }).then((monster) => res.json(monster))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
