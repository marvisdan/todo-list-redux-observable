import { ITodoItem } from "../../models";
import { todoActionType } from "../actions";
import { produce } from "immer";
import { set } from "lodash";

export interface TodosAction {
  type?: any;
  payload?: any;
}

export interface Action {
  type: string;
  payload?: {};
  params?: {};
}

export interface ITodoState {
  todos: ITodoItem[];
  editField: string;
  lastUpdatedTodo: string,
}

export const initialTodoState: ITodoState = {
  todos: [],
  editField: "",
  lastUpdatedTodo: '',
};

const reduceAddTodo = (state: ITodoState, payload: ITodoItem) => {
  if (!payload) {
    return state;
  }
  const newTodos = state.todos.length < 1 ? [payload] : [...state.todos, payload]
  const payloadId = payload.id;

  return produce(state, draft => {

    set(draft, "todos", newTodos);
    set(draft, "lastUpdatedTodo", payloadId);
  });
};

const reduceDisplayEditField = (state: ITodoState, payload: string) =>
  produce(state, draft => {
    set(draft, "editField", payload);
  });

const reduceEditTodo = (state: ITodoState, payload: ITodoItem) => {
  return produce(state, draft => {
    const newTodos = state.todos.map(todo => {
      if (todo.id === payload.id) {
        todo = {
          ...todo,
          value: payload.value
        };
      }
      return todo;
    });
    set(draft, "todos", newTodos);
    set(draft, "editField", "");
  });
};
const reduceRemoveTodo = (state: ITodoState, payload: string) => {
  if (!payload) {
    return state;
  }
  return produce(state, draft => {
    const newTodos = state.todos.filter(todo => todo.id !== payload);
    set(draft, "todos", newTodos);
    set(draft, "lastUpdatedTodo", payload);
  });
};

const reduceCompletedTodo = (state: ITodoState, payload: string) => {
  if (!state.todos) {
    return state;
  }

  const newTodos = state.todos.map(todo => {
    if (todo.id === payload) {
      todo = {
        ...todo,
        completed: !todo.completed
      };
    }
    return todo;
  });

  return produce(state, draft => {
    set(draft, "todos", newTodos);
  });
};

export const reduceLoadedTodos = (state: ITodoState, payload: ITodoItem[]) =>
  produce(state, draft => {

    set(draft, "todos", payload);
  });

const todosReducer = (
  state: ITodoState = initialTodoState,
  action: TodosAction
) => {
  switch (action.type) {
    case todoActionType.LOADED_TODOS:
      return reduceLoadedTodos(state, action.payload);
    case todoActionType.ADD_TODO:
      return reduceAddTodo(state, action.payload);
    case todoActionType.COMPLETED_TODO:
      return reduceCompletedTodo(state, action.payload);
    case todoActionType.REMOVE_TODO:
      return reduceRemoveTodo(state, action.payload);
    case todoActionType.EDIT_TODO:
      return reduceEditTodo(state, action.payload);
    case todoActionType.DISPLAY_EDIT_FIELD:
      return reduceDisplayEditField(state, action.payload);
    default:
      return state;
  }
};

export default todosReducer;
