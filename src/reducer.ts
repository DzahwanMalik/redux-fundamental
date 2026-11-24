import { combineReducers, type ReducersMapObject } from "redux";
import todosReducer from "./features/todosSlice/todosSlice";
import filtersReducer from "./features/filtersSlice/filtersSlice";
import type { TodoAppAction } from "./types/TodoAction.type";
import type { TodoAppState } from "./types/TodoAppState.type";

const reducers: ReducersMapObject<TodoAppState, TodoAppAction> = {
  todos: todosReducer,
  filters: filtersReducer,
};

const rootReducer = combineReducers(reducers);

export default rootReducer;
