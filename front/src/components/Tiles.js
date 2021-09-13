import React from "react"
import Monster from "./Monster"

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
              src={`https://chisel.weirdgloop.org/static/img/osrs-npc/${monster.id}_288.png`}
              class="card-img-top"
              alt="..."
              className="cardImage"
            />
            <div class="card-body">
              <h5 class="card-title">{monster.name}</h5>
            </div>
          </div>
          <div id={`${monster.id}`} class="modal fade" role="dialog">
            <div class="modal-dialog modal-fullscreen">
              <div class="modal-content">
                <div class="modal-header text-center">
                  <button type="button" class="close " data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div class="modal-body">
                  <Monster monster={monster} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Tiles
