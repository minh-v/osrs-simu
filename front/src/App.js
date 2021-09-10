import React, { useState, useEffect } from "react"
import Monster from "./components/Monster"
import List from "./components/List"
import monsterService from "./services/monsters"

//LESSON LEARNED: DO NOT ASSUME API PATTERNS IMMEDIATELY, WILL NEED TO DEAL WITH NICHE API

//https://prices.runescape.wiki/api/v1/osrs/latest GET ITEM PRICES FROM HERE TO SORT BY
//fetch item api
//fetch monster api

const App = () => {
  const [monsters, setMonsters] = useState([]) //objects of all the monsters
  const [selected, setSelected] = useState({})
  // const [selected, setSelected] = useState({
  //   _id: "610b62f06d4abbe9cf68e011",
  //   id: "1",
  //   name: "Molanisk",
  //   last_updated: "2021-08-05",
  //   incomplete: true,
  //   members: true,
  //   release_date: "2007-03-20",
  //   combat_level: 51,
  //   size: 1,
  //   hitpoints: 52,
  //   max_hit: 5,
  //   attack_type: ["melee"],
  //   attack_speed: 4,
  //   aggressive: true,
  //   poisonous: false,
  //   venomous: false,
  //   immune_poison: false,
  //   immune_venom: false,
  //   attributes: [],
  //   category: ["molanisks"],
  //   slayer_monster: true,
  //   slayer_level: 39,
  //   slayer_xp: 52,
  //   slayer_masters: ["vannaka", "chaeldar"],
  //   duplicate: false,
  //   examine: "A strange mole-like being.",
  //   wiki_name: "Molanisk",
  //   wiki_url: "https://oldschool.runescape.wiki/w/Molanisk",
  //   attack_level: 40,
  //   strength_level: 40,
  //   defence_level: 50,
  //   magic_level: 0,
  //   ranged_level: 1,
  //   attack_bonus: 0,
  //   strength_bonus: 0,
  //   attack_magic: 0,
  //   magic_bonus: 0,
  //   attack_ranged: 0,
  //   ranged_bonus: 0,
  //   defence_stab: 45,
  //   defence_slash: 45,
  //   defence_crush: 35,
  //   defence_magic: 30,
  //   defence_ranged: 55,
  //   drops: [
  //     {
  //       id: 526,
  //       name: "Bones",
  //       members: false,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 1,
  //       rolls: 1,
  //     },
  //     {
  //       id: 205,
  //       name: "Grimy harralander",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.0273224043715847,
  //       rolls: 1,
  //     },
  //     {
  //       id: 207,
  //       name: "Grimy ranarr weed",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.021505376344086023,
  //       rolls: 1,
  //     },
  //     {
  //       id: 209,
  //       name: "Grimy irit leaf",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.015625,
  //       rolls: 1,
  //     },
  //     {
  //       id: 211,
  //       name: "Grimy avantoe",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.011723329425556858,
  //       rolls: 1,
  //     },
  //     {
  //       id: 213,
  //       name: "Grimy kwuarm",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.009765625,
  //       rolls: 1,
  //     },
  //     {
  //       id: 215,
  //       name: "Grimy cadantine",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.0078125,
  //       rolls: 1,
  //     },
  //     {
  //       id: 2485,
  //       name: "Grimy lantadyme",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.005858230814294083,
  //       rolls: 1,
  //     },
  //     {
  //       id: 217,
  //       name: "Grimy dwarf weed",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.005858230814294083,
  //       rolls: 1,
  //     },
  //     {
  //       id: 10978,
  //       name: "Swamp weed",
  //       members: true,
  //       quantity: "1-4",
  //       noted: false,
  //       rarity: 0.2890625,
  //       rolls: 1,
  //     },
  //     {
  //       id: 10978,
  //       name: "Swamp weed",
  //       members: true,
  //       quantity: "5-8",
  //       noted: false,
  //       rarity: 0.078125,
  //       rolls: 1,
  //     },
  //     {
  //       id: 555,
  //       name: "Water rune",
  //       members: false,
  //       quantity: "1-14",
  //       noted: false,
  //       rarity: 0.078125,
  //       rolls: 1,
  //     },
  //     {
  //       id: 995,
  //       name: "Coins",
  //       members: false,
  //       quantity: "1-75",
  //       noted: false,
  //       rarity: 0.078125,
  //       rolls: 1,
  //     },
  //     {
  //       id: 7416,
  //       name: "Mole claw",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.0078125,
  //       rolls: 1,
  //     },
  //     {
  //       id: 557,
  //       name: "Earth rune",
  //       members: false,
  //       quantity: "1-20",
  //       noted: false,
  //       rarity: 0.078125,
  //       rolls: 1,
  //     },
  //     {
  //       id: 2677,
  //       name: "Clue scroll (easy)",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.0078125,
  //       rolls: 1,
  //     },
  //     {
  //       id: 561,
  //       name: "Nature rune",
  //       members: false,
  //       quantity: "1-5",
  //       noted: false,
  //       rarity: 0.0234375,
  //       rolls: 1,
  //     },
  //     {
  //       id: 564,
  //       name: "Cosmic rune",
  //       members: false,
  //       quantity: "1-7",
  //       noted: false,
  //       rarity: 0.0390625,
  //       rolls: 1,
  //     },
  //     {
  //       id: 4698,
  //       name: "Mud rune",
  //       members: true,
  //       quantity: "1-15",
  //       noted: false,
  //       rarity: 0.015625,
  //       rolls: 1,
  //     },
  //     {
  //       id: 199,
  //       name: "Grimy guam leaf",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.0625,
  //       rolls: 1,
  //     },
  //     {
  //       id: 201,
  //       name: "Grimy marrentill",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.046948356807511735,
  //       rolls: 1,
  //     },
  //     {
  //       id: 203,
  //       name: "Grimy tarromin",
  //       members: true,
  //       quantity: "1",
  //       noted: false,
  //       rarity: 0.035211267605633804,
  //       rolls: 1,
  //     },
  //   ],
  //   _created: "Thu, 01 Jan 1970 00:00:00 GMT",
  //   _updated: "Thu, 01 Jan 1970 00:00:00 GMT",
  //   _etag: "dbe87c4855ee8ef7e44df83e13232af81de4b508",
  //   _links: {
  //     self: {
  //       title: "Monster",
  //       href: "monsters/610b62f06d4abbe9cf68e011",
  //     },
  //   },
  // }) //selected monster, initially first monster (molanisk)

  useEffect(() => {
    monsterService.getAll().then((res) => setMonsters(res))
  }, [])

  useEffect(() => {
    setSelected(monsters[0])
  }, [monsters])

  return (
    <div>
      <List monsters={monsters} selected={selected} setSelected={setSelected} />
      {selected && <Monster monster={selected} />}
    </div>
  )
}

export default App
