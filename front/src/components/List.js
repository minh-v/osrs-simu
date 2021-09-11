import React from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"

const List = ({ monsters, selected, setSelected }) => {
  return (
    <div>
      <Autocomplete
        value={selected}
        onChange={(event, newValue) => {
          setSelected(newValue) //set selected to the monster object, not the name
        }}
        id="combo-box-demo"
        options={monsters}
        getOptionLabel={(monster) => monster.name || ""} //name
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Monster" variant="outlined" />
        )}
      />
    </div>
  )
}

export default List
