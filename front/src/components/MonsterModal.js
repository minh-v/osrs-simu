import React from "react"
import Monster from "./Monster"

const MonsterModal = ({ monster }) => {
  return (
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
  )
}

export default MonsterModal
