import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";

import { addTodo, editTodo } from "../redux/actions";
import { findEditedFieldSelector, editTodoSelector } from "../redux";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { ITodoItem } from "../models";

const AddTodo = () => {
  const dispatch = useDispatch();
  const [disableButton, setDisableButton] = useState(false);
  const editFieldId = useSelector(editTodoSelector);
  const editFieldSelector = useSelector(findEditedFieldSelector);
  let editFieldValue: string = editFieldId ? editFieldSelector : "";
  const [field, setField] = useState(editFieldId ? editFieldValue : "");

  useEffect(() => {
    setField(editFieldValue);
  }, [editFieldId]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setField(target.value);
  };

  useEffect(() => {
    if (field.trim() === "") {
      setDisableButton(true);
      return;
    }
    setDisableButton(false);
  }, [field]);

  const handleSubmit = () => {
    if (!field || field.trim() === "") {
      return;
    }

    let newTodo: ITodoItem = {
      id: "",
      value: "",
      completed: false
    };

    if (editFieldId) {
      newTodo = {
        ...newTodo,
        id: editFieldId,
        value: field.trim()
      };
      dispatch(editTodo(newTodo));
      setField("");
      return;
    }

    newTodo = {
      ...newTodo,
      id: uuid(),
      value: field.trim()
    };

    dispatch(addTodo(newTodo));
    setField("");
  };

  return (
    <div className="form-container">
      <div className="form">
        <TextField
          id="outlined-basic"
          label="Add a task"
          variant="outlined"
          onChange={onChange}
          value={field}
        />
        <Button
          className="button"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={disableButton}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddTodo;
