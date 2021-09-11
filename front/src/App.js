import React, { useState, useEffect } from "react"
import Monster from "./components/Monster"
import List from "./components/List"
//import monsterService from "./services/monsters"

//LESSON LEARNED: DO NOT ASSUME API PATTERNS IMMEDIATELY, WILL NEED TO DEAL WITH NICHE API

//https://prices.runescape.wiki/api/v1/osrs/latest GET ITEM PRICES FROM HERE TO SORT BY
//fetch item api
//fetch monster api

import { gql, useQuery, useLazyQuery } from "@apollo/client"
//test
const MONSTERS = gql`
  query {
    monsters {
      name
      id
      drops {
        id
        name
        quantity
        rarity
        rolls
        price
      }
      examine
    }
  }
`

const App = () => {
  //const [monsters, setMonsters] = useState([]) //objects of all the monsters
  //const [loaded, setLoaded] = useState(false)
  const [selected, setSelected] = useState({})
  const [getMonsters, { loading, error, data }] = useLazyQuery(MONSTERS)
  console.log(loading)

  //only want to call query on the first render
  useEffect(() => {
    getMonsters()
  }, [])

  useEffect(() => {
    // monsterService.getAll().then((res) => setMonsters(res))
    if (loading === false && data) setSelected(data.monsters[0])
  }, [data, loading])

  // useEffect(() => {
  //   setSelected(monsters[0])
  // }, [monsters])

  if (loading || !data) {
    return <h1>loading...</h1>
  }

  return (
    <div>
      <List
        monsters={data.monsters}
        selected={selected}
        setSelected={setSelected}
      />
      {selected && <Monster monster={selected} />}
    </div>
  )
}

export default App
