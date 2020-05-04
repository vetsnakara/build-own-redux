import { uid } from "./utils";

let todos = [];
let goals = [];

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
  new Promise((res) => {
    setTimeout(() => {
      todos = todos.filter((todo) => todo.id !== id);
      res();
    }, TIMEOUT);
  });

export const deleteGoal = (id) =>
  new Promise((res) => {
    setTimeout(() => {
      goals = goals.filter((goal) => goal.id !== id);
      res();
    }, TIMEOUT);
  });

export const toggleTodo = (id) =>
  new Promise((res) => {
    setTimeout(() => {
      todos = todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      );
      res();
    }, TIMEOUT);
  });
