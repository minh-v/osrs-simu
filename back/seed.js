const axios = require("axios")
const Monster = require("./models/Monster")

const fetchData = (url, prevResponse = []) => {
  return axios
    .get(url)
    .then((res) => res.data)
    .then((newResponse) => {
      const response = [...prevResponse, ...newResponse._items]
      if (newResponse._links.next !== undefined) {
        let nextUrl = `https://api.osrsbox.com/${newResponse._links.next.href}`
        return fetchData(nextUrl, response)
      }

      return response
    })
}

const seed = async () => {
  const baseUrl = "https://api.osrsbox.com/monsters"
  let uniqueMonsters = []
  const unique = []

  await fetchData(baseUrl).then((initialMonsters) => {
    let seen = new Set()
    uniqueMonsters = initialMonsters.filter((monster) => {
      if (seen.has(monster.name)) {
        return false
      } else {
        seen.add(monster.name)
        return true
      }
    })
  })

  //add unique monsters array to mongodb
  uniqueMonsters.map((monster) => {
    new Monster({ monster })
  })
  console.log(uniqueMonsters)

  Monster.insertMany(uniqueMonsters).then((result) => {
    console.log("saved!")
    //mongoose.connection.close()
  })
}

seed()
