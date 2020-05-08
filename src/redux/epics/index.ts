import {
  todoActionType,
  addTodoSuccess,
  completedTodoSuccess,
  removeTodoSuccess,
  editTodoSuccess,
  loadingTodos,
  loadedTodos,
  loadingTodosFailed
} from "../actions";

import { combineEpics, Epic } from "redux-observable";
import { isOfType } from "typesafe-actions";
import { of, from } from "rxjs";
import { ITodoState, TodosAction } from "../reducers";
import { map, startWith, catchError, filter, switchMap } from "rxjs/operators";
import { getTodos } from "../../api";

export const addTodoEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType(todoActionType.ADD_TODO)),
    map(() => addTodoSuccess())
  );

export const completedTodoEpic: Epic<TodosAction, TodosAction, ITodoState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(todoActionType.COMPLETED_TODO)),
    map(() => completedTodoSuccess())
  );

export const removeTodoEpic: Epic<TodosAction, TodosAction, ITodoState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(todoActionType.REMOVE_TODO)),
    map(() => removeTodoSuccess())
  );

export const editTodoEpic: Epic<TodosAction, TodosAction, ITodoState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(todoActionType.EDIT_TODO)),
    map(() => editTodoSuccess())
  );

export const loadTodosEpic = (action$, state$) =>
  action$.pipe(
    filter(isOfType(todoActionType.LOAD_TODOS)),
    switchMap((action: any) =>
      from(getTodos()).pipe(
        map(data => loadedTodos(data)),
        startWith(loadingTodos()),
        catchError(() => of(loadingTodosFailed()))
      )
    )
  );

export const todosEpic = combineEpics(
  addTodoEpic,
  completedTodoEpic,
  removeTodoEpic,
  loadTodosEpic
);
