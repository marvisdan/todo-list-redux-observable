import { createSelector } from "reselect";
import { IState } from '../../models'
export const todosState = (state: IState) => state.todos;
export const filterState = (state: IState) => state.filter;

export const todosSelector = createSelector(
  todosState,
  todosReducer => todosReducer && todosReducer.todos
);

export const visibilityFilterTodosSelector = createSelector(
  filterState,
  filterReducer => filterReducer && filterReducer.visibilityFilter
);

export const filteredTodosSelector = (getVisibleTodos: any) =>
  createSelector(
    todosSelector,
    visibilityFilterTodosSelector,
    (todos, filter) => getVisibleTodos(todos, filter)
  );

export const completedTasksSelector = createSelector(
  todosState,
  todosReducer => todosReducer.todos.filter(todo => todo.completed)
);

export const todoTasksSelector = createSelector(
  todosState,
  todosReducer => todosReducer.todos.filter(todo => !todo.completed)
);

export const editTodoSelector = createSelector(
  todosState,
  todosReducer => todosReducer && todosReducer.editField
);

export const editFieldIdSelector = createSelector(
  todosState,
  todosReducer => todosReducer && todosReducer.editField
);

export const findEditedFieldSelector = createSelector(
  todosSelector,
  editFieldIdSelector,
  (todos, id) => {
    const findEditField = todos && todos.find(todo => todo.id === id);
    return findEditField ? findEditField.value : id;
  }
);
