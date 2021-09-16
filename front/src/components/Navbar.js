import React from "react"

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-dark bg-secondary">
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseBar"
            aria-controls="collapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <div class="collapse" id="collapseBar">
        <div class="bg-secondary p-4">
          <a
            class="text-white"
            href="https://immense-ridge-37267.herokuapp.com/"
          >
            Monsters
          </a>
          <br></br>
          <a class="text-white" href="https://github.com/minh-v/osrs-simu">
            Github
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
