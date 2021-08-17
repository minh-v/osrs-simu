import React, { useState, useEffect } from "react"
import Monster from "./components/Monster"
import monsterService from "./services/monsters"

const App = () => {
  const [monsters, setMonsters] = useState([]) //objects of all the monsters
  const [unique, setUnique] = useState([]) //used to detect duplicate monster names
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
      {monsters.map((monster) => (
        <Monster monster={monster} />
      ))}
    </div>
  )
}

export default App
