import { describe, expect, test } from "vitest";
import filtersReducer from "@/features/filtersSlice/filtersSlice";
import type { TodoAppAction } from "@/types/TodoAction.type";
import type { TodoFilter } from "@/types/TodoAppState.type";

const initialState: TodoFilter = {
  status: "All",
  colors: [],
};

describe("filtersSlice reducer", () => {
  test("should return the initial state when state is undefined", () => {
    expect(filtersReducer(undefined, { type: "unknown" } as unknown as TodoAppAction)).toEqual(
      initialState,
    );
  });

  test("should handle filters/statusFilterChanged", () => {
    const state: TodoFilter = { status: "All", colors: ["blue"] };
    const action: TodoAppAction = {
      type: "filters/statusFilterChanged",
      payload: "Completed",
    };

    const result = filtersReducer(state, action);

    expect(result).toEqual({ status: "Completed", colors: ["blue"] });
  });

  test("should handle filters/colorFilterChanged by adding a color", () => {
    const state: TodoFilter = { status: "All", colors: ["blue"] };
    const action: TodoAppAction = {
      type: "filters/colorFilterChanged",
      payload: "green",
    };

    const result = filtersReducer(state, action);

    expect(result).toEqual({ status: "All", colors: ["blue", "green"] });
  });

  test("should handle filters/colorFilterChanged by removing an existing color", () => {
    const state: TodoFilter = { status: "Active", colors: ["blue", "green"] };
    const action: TodoAppAction = {
      type: "filters/colorFilterChanged",
      payload: "blue",
    };

    const result = filtersReducer(state, action);

    expect(result).toEqual({ status: "Active", colors: ["green"] });
  });

  test("should return the current state for unknown action", () => {
    const state: TodoFilter = { status: "Completed", colors: ["red"] };
    const action = { type: "unknown" } as unknown as TodoAppAction;

    expect(filtersReducer(state, action)).toBe(state);
  });
});

