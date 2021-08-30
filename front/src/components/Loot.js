//button + generate loot
import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"

//can get image icon from api instead of link eventually
/*<img
src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAACGUlEQVR4Xu2Uay8jYRTHPd/ER9i3sl/DG/tCvCESIosEESuItS6LutWlS1HUZdHtbtelbUqKplTpJRrSNBtf5C/nTGbMtJXtRZkX80uedKZnZs7//M95nrIyAwMDXSIgLV0gcLy/j2893Wmi3k2gwJnbjZnvIyzoQ3k5/25ZrW/tmtwmgSu/H7b5Oc394e6ucl9iYVKCZCKByOUlzj0ebpllchIdzc0ce4jHceH14pd9A4vT01naWTDqCqUVOj/DycFf7NlsWLMswGo2sxg5LreMHBrt70fb5ybUfKpSxQpG4F8yiXg4jIDPB9fONlZmZzE+MICRvj6YBgc1QimZLCZ4eoLO1tYX4kUh2U+t6G5vx9cvXUqCcCCQZU4EUg/37JpaxCuJkREaN2QXHlMp3AaDcDsc7CA5SY56nE5llv6/CkJg44dFUzFdkxj/0RG2l5fhc7nYsdh1iFtqHhvl+aKhphjtukQkwkXQ80O9PcpcpWfLkfQZEOzEz9VVLEyY2EFKQoNO7tD1nGmcC3Fu2uH985tddKyvZbhdcCszX9TaTwlpztL/Vy86Cui8amloUARpv1kk6hbSDlRXnW1RnM6tjxUVpRD0XDm1r7GuLsckr9CuTATuYzHc3d4gGrrC1PBwXklyfS4PBBLRKJ/a9qVFVFVW5uhOSZGsp11TW12tB0GE4O3dVF+vF0FESYa0OHQlxsDAIE+eAPFu6xnslQMPAAAAAElFTkSuQmCC"
alt="bones"
/>*/

//make a roll quantity function?

const Loot = ({ drops }) => {
  const [loot, setLoot] = useState([])
  let existedLoot
  let newLoot = loot //do not mutate state directly
  //on click generate loot

  const rollQuantity = (monsterQuantity) => {
    const lowHigh = monsterQuantity.split("-")
    console.log("lowHigh: ", lowHigh)
    if (lowHigh.length === 1) {
      return monsterQuantity //convert to int?
    } else {
      const min = parseInt(lowHigh[0])
      const max = parseInt(lowHigh[1])
      //random int between low and high
      console.log(Math.floor(Math.random() * (max - min + 1) + min))
      return Math.floor(Math.random() * (max - min + 1) + min).toString()
    }
  }

  const handleClick = (drops) => {
    //too slow with full bject? just make it contain id and quantity
    setLoot((prevLoot) => {
      for (let i = 0; i <= drops.length; i++) {
        const random = Math.random() //rarity roll for each item
        if (drops[i].rarity === 1) {
          //detect if drop already exists in loot array, add quantity to it, else create new drop with quantity
          //make it drop all the following loops?
          existedLoot = prevLoot.find((l) => l.id === drops[i].id) //check if already exists
          if (existedLoot) {
            //roll the quantity here
            const updatedQuantity =
              parseInt(existedLoot.quantity) +
              parseInt(rollQuantity(drops[i].quantity))
            const updatedLoot = {
              ...existedLoot,
              quantity: updatedQuantity.toString(),
            }
            //console.log("updated", updatedLoot)

            //replace updated loot
            newLoot = prevLoot.map((loo) =>
              loo.id !== drops[i].id ? loo : updatedLoot
            )
          } else {
            //roll quantity
            const updatedQuantity = rollQuantity(drops[i].quantity)
            const updatedLoot = {
              ...drops[i],
              quantity: updatedQuantity.toString(),
            } //update new quantity for loot
            newLoot = [...prevLoot, updatedLoot]
          }
        } else if (random <= drops[i].rarity) {
          existedLoot = prevLoot.find((l) => l.id === drops[i].id) //check if already exists
          //handle rolls
          //detect if drop already exists in loot array, add quantity to it, else create new drop with quantity
          if (existedLoot) {
            const updatedQuantity =
              parseInt(existedLoot.quantity) +
              parseInt(rollQuantity(drops[i].quantity))
            const updatedLoot = {
              ...existedLoot,
              quantity: updatedQuantity.toString(),
            }
            //console.log("updated", updatedLoot)

            //replace updated loot
            newLoot = prevLoot.map((loo) =>
              loo.id !== drops[i].id ? loo : updatedLoot
            )
            return newLoot
          } else {
            //first time drop appears in loot array
            const updatedQuantity = rollQuantity(drops[i].quantity)
            const updatedLoot = {
              ...drops[i],
              quantity: updatedQuantity.toString(),
            } //update new quantity for loot
            newLoot.push(updatedLoot)
            return newLoot
          }
        }
        //if it reaches the end of the drop table and hasnt rolled a drop
        if (i === drops.length - 1) {
          //console.log("no drops");
          return newLoot
        }
      }
      console.log("?", newLoot)
      return newLoot
    })
  }

  return (
    <div>
      <Button color="primary" onClick={() => handleClick(drops)}>
        generate lootage
      </Button>
      <div>
        {loot.map((drop) => (
          <div>
            <p>
              {drop.name} {drop.quantity}
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

export default Loot
