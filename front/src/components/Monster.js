import React from "react"
import Loot from "./Loot"

const Monster = ({ monster }) => {
  const imgSrc = `https://chisel.weirdgloop.org/static/img/osrs-npc/${monster.id}_288.png`
  // monster image
  return (
    <div>
      <h1>{monster.name}</h1>
      <img className="monsterImage" src={imgSrc} alt="monster pic" />
      <h2>Lootage</h2>
      <Loot drops={monster.drops} />
      <div>
        {monster.drops.map((drop) => (
          <div>
            <p>
              {drop.name} {drop.rarity}
            </p>
            <img
              src={`https://chisel.weirdgloop.org/static/img/osrs-sprite/${drop.id}.png`}
              alt="drop pic"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Monster
