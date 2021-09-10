//button + generate loot
import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Switch from "@material-ui/core/Switch"

//can get image icon from api instead of link eventually
/*<img
src="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAACQAAAAgCAYAAAB6kdqOAAACGUlEQVR4Xu2Uay8jYRTHPd/ER9i3sl/DG/tCvCESIosEESuItS6LutWlS1HUZdHtbtelbUqKplTpJRrSNBtf5C/nTGbMtJXtRZkX80uedKZnZs7//M95nrIyAwMDXSIgLV0gcLy/j2893Wmi3k2gwJnbjZnvIyzoQ3k5/25ZrW/tmtwmgSu/H7b5Oc394e6ucl9iYVKCZCKByOUlzj0ebpllchIdzc0ce4jHceH14pd9A4vT01naWTDqCqUVOj/DycFf7NlsWLMswGo2sxg5LreMHBrt70fb5ybUfKpSxQpG4F8yiXg4jIDPB9fONlZmZzE+MICRvj6YBgc1QimZLCZ4eoLO1tYX4kUh2U+t6G5vx9cvXUqCcCCQZU4EUg/37JpaxCuJkREaN2QXHlMp3AaDcDsc7CA5SY56nE5llv6/CkJg44dFUzFdkxj/0RG2l5fhc7nYsdh1iFtqHhvl+aKhphjtukQkwkXQ80O9PcpcpWfLkfQZEOzEz9VVLEyY2EFKQoNO7tD1nGmcC3Fu2uH985tddKyvZbhdcCszX9TaTwlpztL/Vy86Cui8amloUARpv1kk6hbSDlRXnW1RnM6tjxUVpRD0XDm1r7GuLsckr9CuTATuYzHc3d4gGrrC1PBwXklyfS4PBBLRKJ/a9qVFVFVW5uhOSZGsp11TW12tB0GE4O3dVF+vF0FESYa0OHQlxsDAIE+eAPFu6xnslQMPAAAAAElFTkSuQmCC"
alt="bones"
/>*/

//abberant spectre elite rarity is 1 from api..
//deal with rarity 1 that's not the FIRST item in the drop array abberant, kree

//idea: iterate through the drops array adding all rarity 1s,
//then iterate again attempting to roll for each drop?
//refactor the whole loop again, 2 for loops returning newLoot at the very end, after the first drop in the second array

//implement autokiller

const Loot = ({ drops }) => {
  const [loot, setLoot] = useState([])
  const [counter, setCounter] = useState(0) //Killed x amount of times
  const [autokill, setAutokill] = useState(false)
  let existedLoot
  let newLoot = loot //do not mutate state directly

  //on click generate loot
  //test this function
  const rollQuantity = (monsterQuantity, currQuantity) => {
    const lowHigh = monsterQuantity.split("-")
    if (lowHigh.length === 1) {
      return monsterQuantity //convert to int?
    } else {
      const min = parseInt(lowHigh[0])
      const max = parseInt(lowHigh[1])

      //random int between low and high
      return (
        parseInt(currQuantity.quantity) +
        Math.floor(Math.random() * (max - min + 1) + min)
      )
    }
  }

  const generateLoot = (drops) => {
    let updatedQuantity
    let stillSearching = null //checks if a loot has been found yet
    setCounter(counter + 1)
    //too slow with full object? {id, quality}
    setLoot((prevLoot) => {
      //first loop, check for all rarity --- 1, and add to or update newLoot
      for (let i = 0; i < drops.length; i++) {
        if (drops[i].rarity === 1) {
          //skip reward casket (aberrant spectre)
          if (drops[i].name.includes("Reward casket")) {
            //console.log("hit")
            continue
          }
          existedLoot = prevLoot.find((l) => l.id === drops[i].id) //check if already exists

          if (existedLoot) {
            //cover the case if the rarity === 1 loot is singular or a range
            if (drops[i].quantity.includes("-")) {
              updatedQuantity = rollQuantity(drops[i].quantity, existedLoot)
            } else {
              updatedQuantity =
                parseInt(rollQuantity(drops[i].quantity, existedLoot)) +
                parseInt(existedLoot.quantity)
            }
            const updatedLoot = {
              ...existedLoot,
              quantity: updatedQuantity,
            }

            //replace updated loot
            newLoot = newLoot.map((loo) =>
              loo.id !== drops[i].id ? loo : updatedLoot
            )
          } else {
            // first time
            //roll quantity
            const updatedQuantity = rollQuantity(drops[i].quantity, drops[i])
            const updatedLoot = {
              ...drops[i],
              quantity: updatedQuantity,
            } //update new quantity for loot
            newLoot = [...newLoot, updatedLoot]
          }
        }
        //if havent rolled an item yet
        if (stillSearching !== null) {
          break
        }
        if (stillSearching === null && drops[i].rarity !== 1) {
          const random = Math.random() //rarity roll for each item
          if (random <= drops[i].rarity) {
            existedLoot = prevLoot.find((l) => l.id === drops[i].id) //check if already exists
            //handle rolls
            //detect if drop already exists in loot array, add quantity to it, else create new drop with quantity
            if (existedLoot) {
              if (drops[i].quantity.includes("-")) {
                updatedQuantity = rollQuantity(drops[i].quantity, existedLoot)
              } else {
                updatedQuantity =
                  parseInt(rollQuantity(drops[i].quantity, existedLoot)) +
                  parseInt(existedLoot.quantity)
              }
              const updatedLoot = {
                ...existedLoot,
                quantity: updatedQuantity,
              }

              //replace updated loot
              newLoot = newLoot.map((loo) =>
                loo.id !== drops[i].id ? loo : updatedLoot
              )
            } else {
              //first time drop appears in loot array
              const updatedQuantity = rollQuantity(drops[i].quantity, drops[i])
              const updatedLoot = {
                ...drops[i],
                quantity: updatedQuantity,
              } //update new quantity for loot
              //newLoot.push(updatedLoot)
              newLoot = [...newLoot, updatedLoot]
            }
            stillSearching = drops[i]
          }
        }
      }
      //console.log(stillSearching)
      return newLoot
    })
  }
  // setLoot((prevLoot) => {
  //   for (let i = 0; i <= drops.length; i++) {
  //     const random = Math.random() //rarity roll for each item
  //     if (drops[i].rarity === 1) {
  //       //detect if drop already exists in loot array, add quantity to it, else create new drop with quantity
  //       //make it drop all the following loops?
  //       //skip reward casket
  //       if (drops[i].name.includes("Reward casket")) {
  //         console.log("hit")
  //         continue
  //       }
  //       existedLoot = prevLoot.find((l) => l.id === drops[i].id) //check if already exists

  //       if (existedLoot) {
  //         //cover the case if the rarity === 1 loot is singular or a range
  //         if (drops[i].quantity.includes("-")) {
  //           updatedQuantity = rollQuantity(drops[i].quantity, existedLoot)
  //         } else {
  //           updatedQuantity =
  //             parseInt(rollQuantity(drops[i].quantity, existedLoot)) +
  //             parseInt(existedLoot.quantity)
  //         }
  //         const updatedLoot = {
  //           ...existedLoot,
  //           quantity: updatedQuantity,
  //         }

  //         //replace updated loot
  //         newLoot = newLoot.map((loo) =>
  //           loo.id !== drops[i].id ? loo : updatedLoot
  //         )
  //       } else {
  //         // first time
  //         //roll quantity
  //         const updatedQuantity = rollQuantity(drops[i].quantity, drops[i])
  //         const updatedLoot = {
  //           ...drops[i],
  //           quantity: updatedQuantity,
  //         } //update new quantity for loot
  //         newLoot = [...newLoot, updatedLoot]
  //       }
  //     } else if (random <= drops[i].rarity) {
  //       existedLoot = prevLoot.find((l) => l.id === drops[i].id) //check if already exists
  //       //handle rolls
  //       //detect if drop already exists in loot array, add quantity to it, else create new drop with quantity
  //       if (existedLoot) {
  //         const updatedQuantity = rollQuantity(drops[i].quantity, existedLoot)
  //         const updatedLoot = {
  //           ...existedLoot,
  //           quantity: updatedQuantity,
  //         }

  //         //replace updated loot
  //         newLoot = newLoot.map((loo) =>
  //           loo.id !== drops[i].id ? loo : updatedLoot
  //         )
  //         return newLoot
  //       } else {
  //         //first time drop appears in loot array
  //         const updatedQuantity = rollQuantity(drops[i].quantity, drops[i])
  //         const updatedLoot = {
  //           ...drops[i],
  //           quantity: updatedQuantity,
  //         } //update new quantity for loot
  //         //newLoot.push(updatedLoot)
  //         newLoot = [...newLoot, updatedLoot]
  //         return newLoot
  //       }
  //     }
  //     //if it reaches the end of the drop table and hasnt rolled a drop
  //     if (i === drops.length - 1) {
  //       console.log("no drops")
  //       return newLoot
  //     }
  //   }
  //   console.log("never reaches here", newLoot)
  //   return newLoot
  // })

  if (autokill) setTimeout(() => document.getElementById("kill").click(), 300)

  return (
    <div>
      <p>Killed {counter}x times</p>
      <FormControlLabel
        value="top"
        control={
          <Switch
            color="primary"
            onChange={() => {
              setAutokill(!autokill)
            }}
            checked={autokill}
          />
        }
        label="Autokill"
        labelPlacement="top"
      />
      <br></br>
      <Button id="kill" color="primary" onClick={() => generateLoot(drops)}>
        generate loot
      </Button>
      <Button
        color="secondary"
        onClick={() => {
          setCounter(0)
          setLoot([])
        }}
      >
        reset loot
      </Button>
      <div>
        {loot.map((drop) => (
          <div key={drop.id}>
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

/*
const handleClick = (drops) => {
    //console.log("generate lootage")
    //too slow with full bject? just make it contain id and quantity
    drops.every((drop) => {
      console.log(drop.name, drop.rarity)
      //console.log(drop.name, drop.rarity)
      const random = Math.random() //roll for each item
      if (random <= drop.rarity) {
        console.log(true)
      }
      console.log(random)
      if (drop.rarity === 1) {
        setLoot(loot.concat(drop))
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
          // const updatedLootage = { id: loot.id, quantity: updatedQuantity } //just id and quantity?
          console.log("updated", updatedLoot)

          //replace updated lootage
          //doesnt update currently
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
