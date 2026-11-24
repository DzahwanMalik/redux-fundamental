import type { TodoAppAction } from "../../types/TodoAction.type";
import type { Todo } from "../../types/TodoAppState.type";
import { nextTodoId } from "./utils/utils";

const initialState: Todo[] = [
  { id: 0, text: "Learn React", completed: true },
  { id: 1, text: "Learn Redux", completed: false, color: "purple" },
  { id: 2, text: "Build something fun!", completed: false, color: "blue" },
];

const todosReducer = (state = initialState, action: TodoAppAction) => {
  switch (action.type) {
    case "todos/todoAdded": {
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload as Todo["text"],
          completed: false,
        },
      ];
    }

    case "todos/todoToggled": {
      return state.map((todo) => {
        if (todo.id !== (action.payload as Todo["id"])) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    }

    case "todos/colorSelected": {
      const [todoId, color] = action.payload as [Todo["id"], Todo["color"]];

      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          color,
        };
      });
    }

    case "todos/todoDeleted": {
      return state.filter((todo) => todo.id !== action.payload);
    }

    case "todos/allCompleted": {
      return state.map((todo) => ({
        ...todo,
        completed: true,
      }));
    }

    case "todos/completedCleared": {
      return state.filter((todo) => !todo.completed);
    }

    default:
      return state;
  }
};

export default todosReducer;
