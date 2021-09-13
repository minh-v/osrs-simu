import React from "react"
import Loot from "./Loot"

const Monster = ({ monster }) => {
  const imgSrc = `/monsterImages/${monster.id}_288.png`
  // monster image
  return (
    <div>
      <div className="monster">
        <h1>{monster.name}</h1>
        <img className="monsterImage" src={imgSrc} alt="monster pic" />
        <p>{monster.examine}</p>
        <h2>Loot</h2>
      </div>

      <Loot key={monster.id} drops={monster.drops} />
    </div>
  )
}

export default Monster
