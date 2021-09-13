const axios = require("axios")
const Monster = require("./src/db/models/Monster")
const fs = require("fs")
const path = require("path")

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

const downloadFile = async (fileUrl, downloadFolder) => {
  // Get the file name
  const fileName = path.basename(fileUrl)

  // The path of the downloaded file on our machine
  const localFilePath = path.resolve(__dirname, downloadFolder, fileName)
  try {
    const response = await axios({
      method: "GET",
      url: fileUrl,
      responseType: "stream",
    })

    const w = response.data.pipe(fs.createWriteStream(localFilePath))
    w.on("finish", () => {
      console.log("Successfully downloaded file!")
    })
  } catch (err) {
    throw new Error(err)
  }
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

  //DOWNLOAD IMAGE HERE
  uniqueMonsters.forEach((monster, i) => {
    //set timeout
    setTimeout(() => {
      const monsterImageUrl = `https://chisel.weirdgloop.org/static/img/osrs-npc/${monster.id}_288.png`
      downloadFile(monsterImageUrl, "monsterImages")
      console.log("finished", monster.name)
    }, i * 100)
    // const monsterImageUrl = `https://chisel.weirdgloop.org/static/img/osrs-npc/${monster.id}_288.png`
    // downloadFile(monsterImageUrl, "monsterImages")
    // console.log("finished", monster.name)
  })

  return

  Monster.insertMany(uniqueMonsters).then((result) => {
    console.log("saved!")
    //mongoose.connection.close()
    mongoose.connection.close()
  })
}

seed()
