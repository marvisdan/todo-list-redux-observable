import { ITodoItem } from "../../models";

export enum todoActionType {
  ADD_TODO = "ADD_TODO",
  ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS",
  COMPLETED_TODO = "COMPLETED_TODO",
  DISPLAY_EDIT_FIELD = "DISPLAY_EDIT_FIELD",
  EDIT_TODO = "EDIT_TODO",
  EDIT_TODO_SUCCESS = "EDIT_TODO_SUCCESS",
  COMPLETED_TODO_SUCCESS = "COMPLETED_TODO_SUCCESS",
  REMOVE_TODO = "REMOVE_TODO",
  REMOVE_TODO_SUCCESS = "REMOVE_TODO_SUCCESS",
  LOAD_TODOS = "LOAD_TODOS",
  LOADING_TODOS = "LOADING_TODOS",
  LOADED_TODOS = "LOADED_TODOS",
  LOADING_TODOS_FAILED = "LOADING_TODOS_FAILED",
  CREATE_TODO_IN_LOCAL_STORAGE = "CREATE_TODO_IN_LOCAL_STORAGE",
  UPDATE_TODO_IN_LOCAL_STORAGE = "UPDATE_TODO_IN_LOCAL_STORAGE",
  REMOVE_TODO_IN_LOCAL_STORAGE = "REMOVE_TODO_IN_LOCAL_STORAGE"
}

export const loadTodos = () => {
  return {
    type: todoActionType.LOAD_TODOS
  };
};

export const loadingTodos = () => {
  return {
    type: todoActionType.LOADING_TODOS
  };
};

export const loadedTodos = todos => {
  return {
    type: todoActionType.LOADED_TODOS,
    payload: todos
  };
};

export const loadingTodosFailed = () => {
  return {
    type: todoActionType.LOADING_TODOS_FAILED
  };
};

export const addTodo = (newTodo: ITodoItem) => ({
  type: todoActionType.ADD_TODO,
  payload: {
    id: newTodo.id,
    value: newTodo.value,
    completed: false
  }
});

export const addTodoSuccess = () => {
  return {
    type: todoActionType.ADD_TODO_SUCCESS
  };
};

export const completedTodo = (id: string) => {
  return {
    type: todoActionType.COMPLETED_TODO,
    payload: id
  };
};

export const completedTodoSuccess = () => {
  return {
    type: todoActionType.COMPLETED_TODO_SUCCESS
  };
};

export const removeTodo = (id: string) => {
  return {
    type: todoActionType.REMOVE_TODO,
    payload: id
  };
};

export const removeTodoSuccess = () => {
  return {
    type: todoActionType.REMOVE_TODO_SUCCESS
  };
};

export const displayEditField = (id: string) => {
  return {
    type: todoActionType.DISPLAY_EDIT_FIELD,
    payload: id
  };
};

export const editTodo = (newTodo: ITodoItem) => {
  return {
    type: todoActionType.EDIT_TODO,
    payload: {
      id: newTodo.id,
      value: newTodo.value,
      completed: newTodo.completed
    }
  };
};

export const editTodoSuccess = () => {
  return {
    type: todoActionType.EDIT_TODO_SUCCESS
  };
};
