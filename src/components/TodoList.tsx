import React from "react";
import { useSelector } from "react-redux";

import {
  todosSelector,
  visibilityFilterTodosSelector,
  filteredTodosSelector
} from "../redux";
import { getVisibleTodos } from "../helpers/renderListFiltered";

import Todo from "./Todo";
import { List } from "@material-ui/core";
import { ITodoItem } from "../models";

const TodoList: React.FC = () => {
  const todos = useSelector(todosSelector);
  const filter = useSelector(visibilityFilterTodosSelector);
  const filteredTodos = useSelector(filteredTodosSelector({ getVisibleTodos }));

  if (!filteredTodos || filteredTodos.length < 1) {
    return <p className="no-todo">"There is no todo"</p>;
  }
  return (
    <div className="todos">
      <List>
        {filteredTodos.map((item: ITodoItem) => (
          <Todo {...{ todo: item }} />
        ))}
      </List>
    </div>
  );
};

export default TodoList;
