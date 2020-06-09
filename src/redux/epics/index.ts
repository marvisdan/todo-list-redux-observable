import {
  todoActionType,
  addTodoSuccess,
  addTodoFailed,
  completedTodoSuccess,
  removeTodoSuccess,
  editTodoSuccess,
  loadingTodos,
  loadedTodos,
  loadingTodosFailed,
  editTodoFailed
} from "../actions";

import { combineEpics, Epic, ofType } from "redux-observable";
import { isOfType } from "typesafe-actions";
import { of, from } from "rxjs";
import { TodosAction, ITodoState } from "../reducers/todos";

import { map, startWith, catchError, filter, switchMap, mergeMap, withLatestFrom } from "rxjs/operators";
import { getTodos, createTodoInStorage, removeTodoInStorage, updateTodoInStorage } from "../../api";
import { ITodoItem } from "../../models";

export const addTodoEpic: Epic<any, TodosAction, ITodoState> = (action$: any, state$: any) =>
  action$
    .pipe(
      ofType(todoActionType.ADD_TODO),
      withLatestFrom(state$),
      mergeMap(([, state$]) => {
        const todosState = state$.todos
        const addedValue = todosState.todos.find(({ id }: ITodoItem) => id === todosState.lastUpdatedTodo);
        return from(createTodoInStorage(addedValue))
          .pipe(map(
            () => addTodoSuccess()),
            catchError(() => of(addTodoFailed()))
          )
      }));

export const completedTodoEpic: Epic<any, TodosAction, ITodoState> = (
  action$,
  state$
) =>
  action$.pipe(
    filter(isOfType(todoActionType.COMPLETED_TODO)),
    map(() => completedTodoSuccess())
  );

export const removeTodoEpic: Epic<any, TodosAction, ITodoState> = (
  action$: any,
  state$: any,
) =>
  action$.pipe(
    ofType(todoActionType.REMOVE_TODO),
    withLatestFrom(state$),
    mergeMap(([, state$]) => {
      const todosState = state$.todos;
      const removedValue = todosState.find(({ id }: ITodoItem) => id === todosState.lastUpdatedTodo);
      if (!removedValue) {
        return state$;
      }
      return from(removeTodoInStorage(removedValue))
        .pipe(
          map(() => removeTodoSuccess()),
          catchError(() => of(loadingTodosFailed()))
        )
    }))

export const editTodoEpic: Epic<any, TodosAction, ITodoState> = (
  action$: any,
  state$: any
) =>
  action$.pipe(
    ofType(todoActionType.EDIT_TODO),
    withLatestFrom(state$),
    mergeMap(([, state$]) => {
      const todosState = state$.todos;
      const editedValue = todosState.todos.find(({ id }: ITodoItem) => id === todosState.lastUpdatedTodo);
      if (!editedValue) {
        return state$;
      }
      const editedTodos = todosState.find(({ id }: ITodoItem) => id === editedValue);
      return from(
        updateTodoInStorage(editedTodos))
        .pipe(
          map(() => editTodoSuccess()),
          catchError(() => of(editTodoFailed()))
        )
    })
  );

export const loadTodosEpic: Epic<any, TodosAction, ITodoState> = (action$, state$) =>
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
