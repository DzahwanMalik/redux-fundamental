import { describe, expect, test } from "vitest";
import todosReducer from "@/features/todosSlice/todosSlice";
import type { TodoAppAction } from "@/types/TodoAction.type";
import type { Todo } from "@/types/TodoAppState.type";

const createState = (): Todo[] => [
  { id: 0, text: "Learn React", completed: true },
  { id: 1, text: "Learn Redux", completed: false, color: "purple" },
  { id: 2, text: "Build something fun!", completed: false, color: "blue" },
];

describe("todosSlice reducer", () => {
  test("should return the initial state when state is undefined", () => {
    expect(todosReducer(undefined, { type: "unknown" } as unknown as TodoAppAction)).toEqual(
      createState(),
    );
  });

  test("should handle todos/todoAdded", () => {
    const state = createState();
    const action: TodoAppAction = {
      type: "todos/todoAdded",
      payload: "Write unit tests",
    };

    const result = todosReducer(state, action);

    expect(result).toEqual([
      ...state,
      { id: 3, text: "Write unit tests", completed: false },
    ]);
  });

  test("should handle todos/todoToggled", () => {
    const state = createState();
    const action: TodoAppAction = {
      type: "todos/todoToggled",
      payload: 1,
    };

    const result = todosReducer(state, action);

    expect(result[1]).toEqual({
      id: 1,
      text: "Learn Redux",
      completed: true,
      color: "purple",
    });
    expect(result[0]).toEqual(state[0]);
    expect(result[2]).toEqual(state[2]);
  });

  test("should handle todos/colorSelected", () => {
    const state = createState();
    const action: TodoAppAction = {
      type: "todos/colorSelected",
      payload: [0, "green"],
    };

    const result = todosReducer(state, action);

    expect(result[0]).toEqual({
      id: 0,
      text: "Learn React",
      completed: true,
      color: "green",
    });
    expect(result[1]).toEqual(state[1]);
    expect(result[2]).toEqual(state[2]);
  });

  test("should handle todos/todoDeleted", () => {
    const state = createState();
    const action: TodoAppAction = {
      type: "todos/todoDeleted",
      payload: 1,
    };

    const result = todosReducer(state, action);

    expect(result).toEqual([state[0], state[2]]);
  });

  test("should handle todos/allCompleted", () => {
    const state = createState();
    const action: TodoAppAction = { type: "todos/allCompleted" };

    const result = todosReducer(state, action);

    expect(result).toEqual(state.map((todo) => ({ ...todo, completed: true })));
    expect(result.every((todo) => todo.completed)).toBe(true);
  });

  test("should handle todos/completedCleared", () => {
    const state = createState();
    const action: TodoAppAction = { type: "todos/completedCleared" };

    const result = todosReducer(state, action);

    expect(result).toEqual([state[1], state[2]]);
  });

  test("should return the current state for unknown action", () => {
    const state = createState();
    const action = { type: "unknown" } as unknown as TodoAppAction;

    expect(todosReducer(state, action)).toBe(state);
  });
});

