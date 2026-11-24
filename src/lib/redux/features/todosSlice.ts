import type { TodoAppAction } from "../types/TodoAction.type";
import type { Todo } from "../types/TodoAppState.type";
import { nextTodoId } from "../utils/utils";

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
          text: action.payload,
          completed: false,
        },
      ];
    }

    case "todos/todoToggled": {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    }

    default:
      return state;
  }
};

export default todosReducer;
