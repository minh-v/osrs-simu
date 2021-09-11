const axios = require("axios")
const Monster = require("./src/db/models/Monster")

const fetchMonsterData = (url, prevResponse = []) => {
  return axios
    .get(url)
    .then((res) => res.data)
    .then((newResponse) => {
      const response = [...prevResponse, ...newResponse._items]
      if (newResponse._links.next !== undefined) {
        let nextUrl = `https://api.osrsbox.com/${newResponse._links.next.href}`
        return fetchMonsterData(nextUrl, response)
      }

      return response
    })
}

//get latest prices from https://prices.runescape.wiki/api/v1/osrs/latest
//convert to object {id, lowPrice}
const fetchItemPrices = (url) => {
  let items
  return axios.get(url).then((res) => {
    items = Object.keys(res.data.data).map((key) => ({
      id: key,
      price: res.data.data[key].low,
    }))
    return items
  })
}

const seed = async () => {
  const baseUrl = "https://api.osrsbox.com/monsters"
  const priceUrl = "https://prices.runescape.wiki/api/v1/osrs/latest"
  let uniqueMonsters = []
  let itemPrices = []

  await fetchMonsterData(baseUrl).then((initialMonsters) => {
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

  await fetchItemPrices(priceUrl).then((prices) => {
    itemPrices = prices
  })

  //remove monster from array if has no drops.. why loot simulator if no drops?
  uniqueMonsters = uniqueMonsters.filter((monster) => monster.drops.length > 0)

  //add unique monsters array to mongodb
  uniqueMonsters.map((monster) => {
    //edit items drop array here to include the price (and base64 icon)
    monster.drops.forEach((drop) => {
      let foundItem = itemPrices.find((item) => parseInt(item.id) === drop.id)

      drop.price = foundItem === undefined ? 1 : foundItem.price
    })
    new Monster({ monster })
  })
  //console.log(uniqueMonsters)

  Monster.insertMany(uniqueMonsters).then((result) => {
    console.log("saved!")
    //mongoose.connection.close()
    mongoose.connection.close()
  })
}

seed()
