import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { visibiltyFilter } from "../redux/actions/filter";
import { visibilityFilterTodosSelector } from "../redux/selectors";
import { filterConstant } from "../constants";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const TodoFilter: React.FC = () => {
  const filter = useSelector(visibilityFilterTodosSelector);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(visibiltyFilter(event.target.value));
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl>
      <InputLabel id="demo-controlled-open-select-label">filter</InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={filter}
        onChange={handleChange}
      >
        {filterConstant.all.map((c: string, index: number) => (
          <MenuItem key={index} value={c}>
            {c}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TodoFilter;
