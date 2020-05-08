import { createSelector } from "reselect";

export const todosState = state => state.todos;
export const filterState = state => state.filter;

export const todosSelector = createSelector(
  todosState,
  todosReducer => todosReducer && todosReducer.todos
);

export const visibilityFilterTodosSelector = createSelector(
  filterState,
  filterReducer => filterReducer && filterReducer.visibilityFilter
);

export const filteredTodosSelector = ({ getVisibleTodos }) =>
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
    return findEditField ? findEditField.value : findEditField;
  }
);
