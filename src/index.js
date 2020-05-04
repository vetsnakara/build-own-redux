import { createStore as reduxCreateStore, combineReducers } from "redux";
import { createStore } from "./store";

const uid = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

// action types
const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";

const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";

// action creators
const addTodoAction = (todo) => ({
  type: ADD_TODO,
  todo,
});

const removeTodoAction = (id) => ({
  type: REMOVE_TODO,
  id,
});

const toggleTodoAction = (id) => ({
  type: TOGGLE_TODO,
  id,
});

const addGoalAction = (goal) => ({
  type: ADD_GOAL,
  goal,
});

const removeGoalAction = (id) => ({
  type: REMOVE_GOAL,
  id,
});

// reducers
const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
      );
    default:
      return state;
  }
};

const goals = (state = [], action) => {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.goal];
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
};

// root reducer
const rootReducer = combineReducers({
  todos,
  goals,
});

// store
const store = reduxCreateStore(rootReducer);

// subscribe
store.subscribe(() => {
  const { todos, goals } = store.getState();

  const todoList = document.querySelector("#todos");
  const goalList = document.querySelector("#goals");

  todoList.innerHTML = "";
  goalList.innerHTML = "";

  todos.forEach((todo) => addTodoToDom(todoList, todo));
  goals.forEach((goal) => addGoalToDom(goalList, goal));
});

const addTodoToDom = (parent, item) => {
  const node = document.createElement("li");

  node.style.textDecoration = item.complete ? "line-through" : "normal";

  node.addEventListener("click", () =>
    store.dispatch(toggleTodoAction(item.id))
  );

  const text = document.createTextNode(item.name);
  node.appendChild(text);

  const button = createRemoveBtn(() =>
    store.dispatch(removeTodoAction(item.id))
  );
  node.appendChild(button);

  parent.appendChild(node);
};

const addGoalToDom = (parent, item) => {
  const node = document.createElement("li");

  const text = document.createTextNode(item.name);
  node.appendChild(text);

  const button = createRemoveBtn(() =>
    store.dispatch(removeGoalAction(item.id))
  );
  node.appendChild(button);

  parent.appendChild(node);
};

const createRemoveBtn = (callback) => {
  const button = document.createElement("button");
  button.textContent = "x";
  button.addEventListener("click", callback);
  return button;
};

// DOM code
const addTodo = () => {
  const input = document.querySelector("#todo");
  const name = input.value;

  input.value = "";

  store.dispatch(
    addTodoAction({
      id: uid(),
      name,
      complete: false,
    })
  );
};

const addGoal = () => {
  const input = document.querySelector("#goal");
  const name = input.value;

  input.value = "";

  store.dispatch(
    addGoalAction({
      id: uid(),
      name,
    })
  );
};

document.querySelector("#todoBtn").addEventListener("click", addTodo);
document.querySelector("#goalBtn").addEventListener("click", addGoal);
