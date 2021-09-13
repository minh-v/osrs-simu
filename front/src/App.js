import React, { useState, useEffect } from "react"
import Tiles from "./components/Tiles"
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
  const [selected, setSelected] = useState([])
  const [search, setSearch] = useState({})
  const [getMonsters, { loading, error, data }] = useLazyQuery(MONSTERS)
  //let monstersToShow
  const handleSearch = (event) => {
    setSelected(
      data.monsters.filter((monster) =>
        monster.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  //only want to call query on the first render
  useEffect(() => {
    getMonsters()
  }, [])

  useEffect(() => {
    if (loading === false && data) {
      // monstersToShow = selected.length === 0 ? data.monsters : selected
      // setSelected(monstersToShow)
    }
  }, [data, loading])

  // useEffect(() => {
  //   setSelected(monsters[0])
  // }, [monsters])

  if (loading || !data) {
    return <h1>loading...</h1>
  }
  const monstersToShow = selected.length === 0 ? data.monsters : selected

  return (
    <div class="container">
      {/* <List
        monsters={data.monsters}
        selected={selected}
        setSelected={setSelected}
      /> */}
      {/* <Pick monsters={data.monsters} /> */}
      <form>
        <input onChange={handleSearch} />{" "}
      </form>
      {/* {selected && <Monster monster={selected} />} */}
      <Tiles monsters={monstersToShow} />
    </div>
  )
}

export default App
