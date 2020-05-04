import { uid } from "./utils";

const fail = () => Math.random() > 0.5;

let todos = [
  {
    id: uid(),
    name: "Todo 1",
    completed: false,
  },
  {
    id: uid(),
    name: "Todo 2",
    completed: false,
  },
  {
    id: uid(),
    name: "Todo 3",
    completed: false,
  },
];

let goals = [
  {
    id: uid(),
    name: "Goal 1",
  },
  {
    id: uid(),
    name: "Goal 2",
  },
];

const TIMEOUT = 1000;

export const fetchTodos = () =>
  new Promise((res) => {
    setTimeout(() => {
      res(todos);
    }, TIMEOUT);
  });

export const fetchGoals = () =>
  new Promise((res) => {
    setTimeout(() => {
      res(goals);
    }, TIMEOUT);
  });

export const addTodo = (name) =>
  new Promise((res) => {
    const todo = {
      id: uid(),
      name,
      completed: false,
    };

    todos = [todo, ...todos];

    res(todo);
  });

export const addGoal = (name) =>
  new Promise((res) => {
    const goal = {
      id: uid(),
      name,
    };

    goals = [goal, ...goals];

    res(goal);
  });

export const deleteTodo = (id) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (fail()) {
        return rej();
      }

      todos = todos.filter((todo) => todo.id !== id);

      res();
    }, TIMEOUT);
  });

export const deleteGoal = (id) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (fail()) {
        return rej();
      }

      goals = goals.filter((goal) => goal.id !== id);

      res();
    }, TIMEOUT);
  });

export const toggleTodo = (id) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (fail()) {
        return rej();
      }

      todos = todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      );

      res();
    }, TIMEOUT);
  });
