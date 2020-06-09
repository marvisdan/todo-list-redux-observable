import { getItem, setItem } from "../utils/storage";

export const getTodos = async () => await getItem("todos");

export const getTodo = async (id) => {
  const todos = await getItem("todos");
  return todos.find(({ id: todoId }) => id === todoId);
};

export const createTodoInStorage = async todo => {
  const todos = await getItem("todos");
  const newTodo = todo;

  await setItem("todos", [...todos, newTodo]);
  return newTodo;
};

export const updateTodoInStorage = async ({ id, ...todo }) => {
  const todos = await getItem("todos");
  const newTodos = todos.map(
    ({ id: todoId, ...t }) =>
      (id === todoId && {
        id: todoId,
        ...todo
      }) || { ...t, id: todoId }
  );
  await setItem("todos", newTodos);
  return { ...todo, id };
};

export const removeTodoInStorage = async (id) => {
  const todos = await getItem("todos");
  const newTodos = todos.filter(({ id: todoId }) => id !== todoId);

  await setItem("todos", newTodos);
  return newTodos;
};
