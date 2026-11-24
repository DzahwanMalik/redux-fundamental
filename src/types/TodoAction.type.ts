export type TodoActionType =
  | "todos/todoAdded"
  | "todos/todoToggled"
  | "todos/colorSelected"
  | "todos/todoDeleted"
  | "todos/allCompleted"
  | "todos/completedCleared";

export type FilterActionType =
  | "filters/statusFilterChanged"
  | "filters/colorFilterChanged";

export type TodoAppAction = {
  type: TodoActionType | FilterActionType;
  payload?: string | number | (string | number)[];
};
