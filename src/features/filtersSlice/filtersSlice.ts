import type { TodoAppAction } from "../../types/TodoAction.type";
import type { TodoFilter } from "../../types/TodoAppState.type";

type TodoFilterColors = TodoFilter["colors"][number];

const initialState: TodoFilter = {
  status: "All",
  colors: [],
};

const filtersReducer = (state = initialState, action: TodoAppAction) => {
  switch (action.type) {
    case "filters/statusFilterChanged": {
      return {
        ...state,
        status: action.payload as TodoFilter["status"],
      };
    }

    case "filters/colorFilterChanged": {
      const color = action.payload as TodoFilterColors;
      const alreadySelected = state.colors.includes(color);

      return {
        ...state,
        colors: alreadySelected
          ? state.colors.filter((item) => item !== color)
          : [...state.colors, color],
      };
    }

    default:
      return state;
  }
};

export default filtersReducer;
