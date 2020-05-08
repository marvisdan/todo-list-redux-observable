import { ITodoItem } from "../models";

export const getVisibleTodos = (todos: ITodoItem[], filter: string) => {
  switch (filter) {
    case "ALL":
      return todos;
    case "ACTIVE":
      return todos.filter(todo => !todo.completed);
    case "COMPLETED":
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
};
