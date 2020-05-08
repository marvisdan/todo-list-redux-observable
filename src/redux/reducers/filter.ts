import { ITodoItem } from "../../models";
import { todoActionType } from "../actions";
import { produce } from "immer";
import { set } from "lodash";
import { filterConstant } from "../../constants";
import { filterActionType } from "../actions/filter";
import { ActionType } from "typesafe-actions";

export interface FilterAction {
  type: any;
  payload: any;
}

export interface IFilterState {
  visibilityFilter: string;
}

const initialTodoState: IFilterState = {
  visibilityFilter: filterConstant.SHOW_ALL
};

export const reduceFilteredTodos = (state: IFilterState, payload) =>
  produce(state, draft => {
    set(draft, "visibilityFilter", payload);
  });

const filterTodosReducer = (
  state: IFilterState = initialTodoState,
  action: FilterAction
) => {
  //console.log("action", action, state);
  switch (action.type) {
    case filterActionType.VISIBILTY_FILTER:
      return reduceFilteredTodos(state, action.payload);
    default:
      return state;
  }
};

export default filterTodosReducer;
