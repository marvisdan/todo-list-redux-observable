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

export const initialFilterState: IFilterState = {
  visibilityFilter: filterConstant.SHOW_ALL
};

export const reduceFilteredTodos = (state: IFilterState, payload: string) =>
  produce(state, draft => {
    set(draft, "visibilityFilter", payload);
  });

const filterTodosReducer = (
  state: IFilterState = initialFilterState,
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
