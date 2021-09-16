import react, { useState } from "react"

const Pick = ({ monsters }) => {
  // const [open, setOpen] = useState(false)
  // const handleClick = () => {
  //   setOpen(!open)
  // }

  //const imgSrc = "https://chisel.weirdgloop.org/static/img/osrs-npc/1_288.png"

  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModalLong"
      >
        Pick Monster
      </button>

      <div
        class="modal fade"
        id="exampleModalLong"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-scrollable modal-xl"
          role="document"
          id="container"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Pick a monster
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="row row-cols-1 row-cols-md-4 g-4">
                  {monsters.map((monster) => (
                    <div class="col" key={monster.id}>
                      <div class="card">
                        <a href="https://google.com" class="stretched-link" />
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
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pick
