import React from "react"

const Monster = ({ monster }) => {
  const imgSrc = `https://chisel.weirdgloop.org/static/img/osrs-npc/${monster.id}_288.png`
  return (
    <div>
      <h1>{monster.name}</h1>
      <img
        className="monsterImage"
        src={imgSrc}
        alt="monster pic"
        width="400"
        height="auto"
      />
    </div>
  )
}

export default Monster
