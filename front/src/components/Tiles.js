import React from "react"
import MonsterModal from "./MonsterModal"
//import LazyLoad from "react-lazyload"
//lazyload doesnt seem to help (initial loading)?

//need to dynamically render this

const Tiles = ({ monsters }) => {
  //   const monsterName = monsters.map((monster) => {
  //     return { ...monster, name: monster.name.replace(/ /g, "&nbsp;") }
  //   })

  //   console.log(monsterName)
  return (
    <div class="row row-cols-12 gx-2 gy-2">
      {monsters.map((monster) => (
        <div class="col clearfix customRow" key={monster.id}>
          <div class="card">
            <a
              href={`${monster.id}`}
              class="stretched-link"
              data-bs-target={`#id${monster.id}`}
              data-bs-toggle="modal"
            >
              <img
                src={`/monsterImages/${monster.id}_288.png`}
                class="card-img-top"
                alt="..."
                className="cardImage"
              />
              <div class="card-body">
                <h5 class="card-title">{monster.name}</h5>
              </div>
            </a>
          </div>
          <MonsterModal monster={monster} />
        </div>
      ))}
    </div>
  )
}

export default Tiles

// old working code
{
  /* <div class="row row-cols-12 gx-2 gy-2">
      {monsters.map((monster) => (
        <div class="col" key={monster.id}>
          <div class="card">
            <a
              href={`${monster.id}`}
              class="stretched-link"
              data-bs-target={`#id${monster.id}`}
              data-bs-toggle="modal"
            >
              <img
                src={`/monsterImages/${monster.id}_288.png`}
                class="card-img-top"
                alt="..."
                className="cardImage"
              />
              <div class="card-body">
                <h5 class="card-title">{monster.name}</h5>
              </div>
            </a>
          </div>
          <MonsterModal monster={monster} />
        </div>
      ))}
    </div> */
}
