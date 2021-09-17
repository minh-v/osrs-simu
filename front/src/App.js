import React, { useState, useEffect } from "react"
import Tiles from "./components/Tiles"
import Navbar from "./components/Navbar"
//import monsterService from "./services/monsters"

//LESSON LEARNED: DO NOT ASSUME API PATTERNS IMMEDIATELY, WILL NEED TO DEAL WITH NICHE API

//https://prices.runescape.wiki/api/v1/osrs/latest GET ITEM PRICES FROM HERE TO SORT BY
//fetch item api
//fetch monster api

import { gql, useLazyQuery } from "@apollo/client"

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
      combat_level
      max_hit
    }
  }
`

const App = () => {
  //const [monsters, setMonsters] = useState([]) //objects of all the monsters
  //const [loaded, setLoaded] = useState(false)
  //const [selected, setSelected] = useState([])
  const [search, setSearch] = useState([])
  const [getMonsters, { loading, error, data }] = useLazyQuery(MONSTERS)
  //let monstersToShow
  const handleSearch = (event) => {
    setSearch(
      data.monsters.filter((monster) =>
        monster.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  //only want to call query on the first render
  useEffect(() => {
    getMonsters()
  }, [])

  // useEffect(() => {
  //   setSelected(monsters[0])
  // }, [monsters])

  if (loading || !data) {
    //center spinner
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border " role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  //search filter
  const monstersToShow = search.length === 0 ? data.monsters : search
  console.log(monstersToShow[0])
  return (
    <>
      <Navbar />
      <div class="container-sm bg-dark">
        <div class="row">
          <form>
            <input
              onChange={handleSearch}
              placeholder="search monster"
              className={"searchBar"}
            />{" "}
          </form>
        </div>
        {/* {selected && <Monster monster={selected} />} */}
        <Tiles monsters={monstersToShow} />
      </div>
    </>
  )
}

export default App
