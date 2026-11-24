import { expect, test } from "vitest";
import { nextTodoId } from "@/features/todosSlice/utils/utils";
import type { Todo } from "@/types/TodoAppState.type";

const todos: Todo[] = [
  { id: 1, text: "Hidup Bahagia Dunia Akhirat", completed: false },
];

test("should return correct next id", () => {
  expect(nextTodoId(todos)).toBe(2);
});
