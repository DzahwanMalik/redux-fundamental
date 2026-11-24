import type { TodoAppAction } from "../types/TodoAction.type";
import type { TodoFilter } from "../types/TodoAppState.type";

const initialState: TodoFilter = {
  status: "All",
  colors: [],
};

export default function filtersReducer(
  state = initialState,
  action: TodoAppAction,
) {
  switch (action.type) {
    case "filters/statusFilterChanged": {
      return {
        ...state,
        status: action.payload,
      };
    }

    default:
      return state;
  }
}
