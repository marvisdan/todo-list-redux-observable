import React from "react";

import { useDispatch } from "react-redux";
import { completedTodo, displayEditField, removeTodo } from "../redux/actions";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { ListItem, IconButton, ListItemText } from "@material-ui/core";
import { ITodoItem } from "../models";

import "../styles.css";

type TodoProps = { todo: ITodoItem };

const Todo = ({ todo }: TodoProps) => {
  const dispatch = useDispatch();

  if (!todo) {
    return null;
  }

  const complete = (id: string) => () => {
    dispatch(completedTodo(id));
  };

  const remove = (id: string) => () => {
    dispatch(removeTodo(id));
  };

  const displayField = (id: string) => () => {
    dispatch(displayEditField(id));
  };

  return (
    <ListItem key={todo.id}>
      <ListItemText
        className={todo.completed ? "completed" : ""}
        primary={todo.value}
        onClick={complete(todo.id)}
      />
      <IconButton edge="end" aria-label="delete">
        <DeleteIcon onClick={remove(todo.id)} />
      </IconButton>
      {!todo.completed && (
        <IconButton edge="end" aria-label="edit">
          <EditIcon onClick={displayField(todo.id)} />
        </IconButton>
      )}
    </ListItem>
  );
};
export default Todo;
