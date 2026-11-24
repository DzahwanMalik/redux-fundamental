import type { Todo } from "../../../types/TodoAppState.type";

const nextTodoId = (todos: Todo[]) => {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
};

export { nextTodoId };
