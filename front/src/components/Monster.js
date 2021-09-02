import React from "react"
import Loot from "./Loot"

const Monster = ({ monster }) => {
  const imgSrc = `https://chisel.weirdgloop.org/static/img/osrs-npc/${monster.id}_288.png`
  // monster image
  return (
    <div>
      <h1>{monster.name}</h1>
      <img className="monsterImage" src={imgSrc} alt="monster pic" />
      <h2>Loot</h2>
      <Loot key={monster.id} drops={monster.drops} />
    </div>
  )
}

export default Monster
