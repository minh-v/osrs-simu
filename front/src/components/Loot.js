//button + generate loot
import React, { useState, useEffect } from "react"
import Button from "@material-ui/core/Button"

//can get image icon from api instead of link eventually
/*<img
src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAACGUlEQVR4Xu2Uay8jYRTHPd/ER9i3sl/DG/tCvCESIosEESuItS6LutWlS1HUZdHtbtelbUqKplTpJRrSNBtf5C/nTGbMtJXtRZkX80uedKZnZs7//M95nrIyAwMDXSIgLV0gcLy/j2893Wmi3k2gwJnbjZnvIyzoQ3k5/25ZrW/tmtwmgSu/H7b5Oc394e6ucl9iYVKCZCKByOUlzj0ebpllchIdzc0ce4jHceH14pd9A4vT01naWTDqCqUVOj/DycFf7NlsWLMswGo2sxg5LreMHBrt70fb5ybUfKpSxQpG4F8yiXg4jIDPB9fONlZmZzE+MICRvj6YBgc1QimZLCZ4eoLO1tYX4kUh2U+t6G5vx9cvXUqCcCCQZU4EUg/37JpaxCuJkREaN2QXHlMp3AaDcDsc7CA5SY56nE5llv6/CkJg44dFUzFdkxj/0RG2l5fhc7nYsdh1iFtqHhvl+aKhphjtukQkwkXQ80O9PcpcpWfLkfQZEOzEz9VVLEyY2EFKQoNO7tD1nGmcC3Fu2uH985tddKyvZbhdcCszX9TaTwlpztL/Vy86Cui8amloUARpv1kk6hbSDlRXnW1RnM6tjxUVpRD0XDm1r7GuLsckr9CuTATuYzHc3d4gGrrC1PBwXklyfS4PBBLRKJ/a9qVFVFVW5uhOSZGsp11TW12tB0GE4O3dVF+vF0FESYa0OHQlxsDAIE+eAPFu6xnslQMPAAAAAElFTkSuQmCC"
alt="bones"
/>*/

const Loot = ({ drops }) => {
  const [loot, setLoot] = useState([])
  let existedLoot
  let newLoot = loot //do not mutate state directly
  //on click generate loot

  const handleClick = (drops) => {
    //too slow with full bject? just make it contain id and quantity
    setLoot((prevLoot) => {
      drops.every((drop) => {
        const random = Math.random() //rarity roll for each item
        if (drop.rarity === 1) {
          //detect if drop already exists in loot array, add quantity to it, else create new drop with quantity
          //make it drop all the following loops?
          existedLoot = prevLoot.find((l) => l.id === drop.id) //check if already exists
          if (existedLoot) {
            //roll the quantity here
            const updatedQuantity =
              parseInt(existedLoot.quantity) + parseInt(drop.quantity)
            const updatedLoot = {
              ...existedLoot,
              quantity: updatedQuantity.toString(),
            }
            console.log("updated", updatedLoot)

            //replace updated loot
            newLoot = prevLoot.map((loo) =>
              loo.id !== drop.id ? loo : updatedLoot
            )
            // setLoot((oldLoot) => [...oldLoot, drop])
          } else {
            //roll quantity
            newLoot = [...prevLoot, drop]
            //console.log("first entry", newLoot)
          }
        } else if (random <= drop.rarity) {
          console.log("entered drop table", drop)
          console.log("random number: ", random)
          //handle quantity handle rolls
          //detect if drop already exists in loot array, add quantity to it, else create new drop with quantity
          newLoot.push(drop)
          console.log("newLoot: ", newLoot)
          return newLoot
        }
      })
      console.log("newLoot", newLoot)
      //LOOP ENDS HERE THO
      return newLoot
    })
  }
  /*
    drops.every((drop) => {
      const random = Math.random() //roll for each item
      if (drop.rarity === 1) {
        //detect if drop already exists in loot array, add quantity to it, else create new drop with quantity
        //make it drop all the following loops?
        existedLoot = loot.find((l) => l.id === drop.id) //check if already exists
        if (existedLoot) {
          //roll the quantity here
          const updatedQuantity =
            parseInt(existedLoot.quantity) + parseInt(drop.quantity)
          const updatedLoot = {
            ...existedLoot,
            quantity: updatedQuantity.toString(),
          }
          console.log("updated", updatedLoot)

          //replace updated loot
          setLoot(loot.map((loo) => (loo.id !== drop.id ? loo : updatedLoot)))
          // setLoot((oldLoot) => [...oldLoot, drop])
        } else {
          console.log("first entry", drop)
          //roll quantity
          setLoot((loot) => [...loot, drop])
        }

        return true //continue loop
      } else if (random <= drop.rarity) {
        //handle quantity handle rolls
        //detect if drop already exists in loot array, add quantity to it, else create new drop with quantity
        setLoot(loot.concat(drop))
        return false //break out of loop
      }
      return true
    })
  }
  */

  useEffect(() => {
    console.log("loot", loot)
  }, [loot])

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
