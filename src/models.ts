import { ITodoState, initialTodoState } from "./redux/reducers/todos";
import { initialFilterState, IFilterState } from "./redux/reducers/filter";

export interface IState {
  todos: ITodoState;
  filter: IFilterState;
}



export const intialState: IState = {
  todos: initialTodoState,
  filter: initialFilterState
};

export interface ITodoItem {
  id: string;
  value: string;
  completed: boolean;
}
