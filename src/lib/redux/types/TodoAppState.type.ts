type TodoFilterStatus = "All" | "Active" | "Completed";

type TodoFilterColors = "green" | "blue" | "orange" | "purple" | "red";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  color?: TodoFilterColors;
};

export type TodoFilter = {
  status: TodoFilterStatus;
  colors: TodoFilterColors[];
};

export type TodoAppState = {
  todos: Todo[];
  filters: TodoFilter;
};
