import { useMemo, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

type Color = "Green" | "Blue" | "Orange" | "Purple" | "Red";
type StatusFilter = "All" | "Active" | "Completed";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  color: Color | "";
};

const COLORS: Color[] = ["Green", "Blue", "Orange", "Purple", "Red"];

const COLOR_STYLES: Record<Color, { text: string; bg: string }> = {
  Green: { text: "text-green-600", bg: "bg-green-600" },
  Blue: { text: "text-blue-600", bg: "bg-blue-600" },
  Orange: { text: "text-orange-500", bg: "bg-orange-500" },
  Purple: { text: "text-purple-700", bg: "bg-purple-700" },
  Red: { text: "text-red-600", bg: "bg-red-600" },
};

const initialTodos: Todo[] = [
  { id: 1, text: "Learn React", completed: true, color: "" },
  { id: 2, text: "Learn Redux", completed: false, color: "Purple" },
  { id: 3, text: "Build something fun!", completed: false, color: "Blue" },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [selectedColors, setSelectedColors] = useState<Color[]>(["Blue"]);
  const [nextId, setNextId] = useState(4);

  const remaining = todos.filter((todo) => !todo.completed).length;

  const visibleTodos = useMemo(() => {
    if (status === "Active") return todos.filter((todo) => !todo.completed);
    if (status === "Completed") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, status]);

  const addTodo = () => {
    const text = newTodo.trim();
    if (!text) return;
    setTodos([...todos, { id: nextId, text, completed: false, color: "" }]);
    setNextId(nextId + 1);
    setNewTodo("");
  };

  const toggleTodo = (id: number) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );

  const deleteTodo = (id: number) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const setTodoColor = (id: number, color: Color | "") =>
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, color } : todo)));

  const markAllCompleted = () =>
    setTodos(todos.map((todo) => ({ ...todo, completed: true })));

  const clearCompleted = () =>
    setTodos(todos.filter((todo) => !todo.completed));

  const toggleColor = (color: Color) =>
    setSelectedColors((current) =>
      current.includes(color)
        ? current.filter((item) => item !== color)
        : [...current, color],
    );

  return (
    <div className="min-h-screen bg-[#f4f4f4] font-sans">
      <header className="flex h-19 items-center justify-center bg-[#7b52d3]">
        <h1 className="text-[38px] font-bold tracking-wide text-white">
          Redux Fundamentals Example
        </h1>
      </header>

      <main className="flex flex-col items-center px-4">
        <h2 className="mb-6 mt-2 text-[34px] font-normal text-[#b23b3b]">
          Todos
        </h2>

        <section className="flex min-h-116.25 w-full max-w-160 flex-col border border-gray-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
          <div className="border-b border-gray-200 px-4 py-3">
            <input
              type="text"
              value={newTodo}
              onChange={(event) => setNewTodo(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") addTodo();
              }}
              placeholder="What needs to be done?"
              className="w-full bg-transparent text-[17px] text-gray-700 placeholder:text-gray-400 focus:outline-none"
            />
          </div>

          <ul className="flex-1">
            {visibleTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 border-b border-gray-200 px-4 py-2"
              >
                <button
                  type="button"
                  onClick={() => toggleTodo(todo.id)}
                  aria-label={
                    todo.completed ? "Mark as active" : "Mark as completed"
                  }
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    todo.completed
                      ? "border-green-400 bg-green-50 text-green-500"
                      : "border-gray-300 text-transparent hover:border-gray-400"
                  }`}
                >
                  <FaCheck className="h-3.5 w-3.5" />
                </button>

                <span className="flex-1 text-[17px] text-gray-800">
                  {todo.text}
                </span>

                <select
                  value={todo.color}
                  onChange={(event) =>
                    setTodoColor(todo.id, event.target.value as Color | "")
                  }
                  aria-label="Todo color"
                  className={`h-6 w-[74px] cursor-pointer border border-gray-300 bg-white px-1 text-xs font-bold focus:outline-none ${
                    todo.color ? COLOR_STYLES[todo.color].text : "text-gray-600"
                  }`}
                >
                  <option value=""></option>
                  {COLORS.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="Delete todo"
                  className="text-red-400 transition-colors hover:text-red-600"
                >
                  <FaTimes className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <footer className="grid grid-cols-4 gap-2 border-t border-gray-200 px-4 py-3">
            <div>
              <h3 className="mb-2 text-center text-xs font-bold text-gray-700">
                Actions
              </h3>
              <div className="flex flex-col items-start gap-2">
                <button
                  type="button"
                  onClick={markAllCompleted}
                  className="rounded bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-blue-700"
                >
                  Mark All Completed
                </button>
                <button
                  type="button"
                  onClick={clearCompleted}
                  className="rounded bg-[#2563eb] px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-blue-700"
                >
                  Clear Completed
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-2 text-center text-xs font-bold text-gray-700">
                Remaining Todos
              </h3>
              <p className="text-center text-xs text-gray-600">
                {remaining} item{remaining === 1 ? "" : "s"} left
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-center text-xs font-bold text-gray-700">
                Filter by Status
              </h3>
              <ul className="flex flex-col items-center gap-1 text-xs text-gray-600">
                {(["All", "Active", "Completed"] as StatusFilter[]).map(
                  (option) => (
                    <li key={option}>
                      <button
                        type="button"
                        onClick={() => setStatus(option)}
                        className={
                          status === option
                            ? "font-semibold text-gray-800"
                            : "hover:text-gray-800"
                        }
                      >
                        {option}
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 text-center text-xs font-bold text-gray-700">
                Filter by Color
              </h3>
              <ul className="flex flex-col items-start gap-1 text-xs text-gray-700">
                {COLORS.map((color) => {
                  const checked = selectedColors.includes(color);
                  return (
                    <li key={color}>
                      <label className="flex cursor-pointer items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleColor(color)}
                          className="sr-only"
                        />
                        <span
                          className={`flex h-3.5 w-3.5 items-center justify-center border ${
                            checked
                              ? `${COLOR_STYLES[color].bg} border-transparent text-white`
                              : "border-gray-400 bg-white"
                          }`}
                        >
                          {checked && <FaCheck className="h-2.5 w-2.5" />}
                        </span>
                        <span>{color}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
