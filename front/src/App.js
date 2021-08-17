import React, { useState, useEffect } from "react"
import monsterService from "./services/monsters"
import axios from "axios"

const App = () => {
  const [monsters, setMonsters] = useState([])
  const [apiUrl, setapiUrl] = useState([])
  const [unique, setUnique] = useState([])
  const baseUrl = "https://api.osrsbox.com/monsters"

  useEffect(() => {
    monsterService.fetchData(baseUrl).then((initialMonsters) => {
      let seen = new Set(unique)
      const uniqueMonsters = initialMonsters.filter((monster) => {
        if (seen.has(monster.name)) {
          return false
        } else {
          seen.add(monster.name)
          return true
        }
      })
      setMonsters(monsters.concat(uniqueMonsters))
      setUnique(unique.concat(Array.from(seen)))
    })
  }, [])

  console.log(monsters)
  //console.log(unique)

  return (
    <div>
      <ul>
        {monsters.map((monster) => (
          <li key={monster._id}>{monster.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
