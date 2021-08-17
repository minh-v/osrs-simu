import React from "react"

const Monster = ({ monster }) => {
  const imgSrc = `https://chisel.weirdgloop.org/static/img/osrs-npc/${monster.id}_288.png`
  //
  return (
    <div>
      <h1>{monster.name}</h1>
      <img className="monsterImage" src={imgSrc} alt="monster pic" />
      <h2>Lootage</h2>
      <div>
        {monster.drops.map((drop) => (
          <div>
            <p>
              {drop.name} {drop.rarity}
            </p>
            <img
              src={`https://chisel.weirdgloop.org/static/img/osrs-sprite/${drop.id}.png`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Monster
