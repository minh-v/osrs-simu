const fs = require("fs")
const path = require("path")
const axios = require("axios").default
const Monster = require("./src/db/models/Monster")

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      "file"
    )
  })

// fileUrl: the absolute url of the image or video you want to download
// downloadFolder: the path of the downloaded file on your machine
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
    w = resizeFile(w)
    w.on("finish", () => {
      console.log("Successfully downloaded file!")
    })
  } catch (err) {
    throw new Error(err)
  }
}

// Testing
const IMAGE_URL = "https://chisel.weirdgloop.org/static/img/osrs-npc/1_288.png"

Monster.find({}).then((res) => {
  console.log("res", res)
})

//downloadFile(IMAGE_URL, "monsterImages")
