import React from "react"
import MonsterModal from "./MonsterModal"
import LazyLoad from "react-lazyload"
//lazyload doesnt seem to help (initial loading)?

//need to dynamically render this

const Tiles = ({ monsters }) => {
  //   const monsterName = monsters.map((monster) => {
  //     return { ...monster, name: monster.name.replace(/ /g, "&nbsp;") }
  //   })

  //   console.log(monsterName)
  return (
    <div class="row row-cols-9 gx-2 gy-2">
      {monsters.map((monster) => (
        <div class="col" key={monster.id}>
          <div class="card ">
            <a
              href={`#${monster.id}`}
              class="stretched-link"
              data-target={`#${monster.id}`}
              data-toggle="modal"
            />
            <img
              src={`/monsterImages/${monster.id}_288.png`}
              class="card-img-top"
              alt="..."
              className="cardImage"
            />
            <div class="card-body">
              <h5 class="card-title">{monster.name}</h5>
            </div>
          </div>
          <MonsterModal monster={monster} />
        </div>
      ))}
    </div>
  )
}

export default Tiles
