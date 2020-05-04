import { store } from "./store";
import {
  addTodoAction,
  addGoalAction,
  removeTodoAction,
  removeGoalAction,
  toggleTodoAction,
} from "./actions";

import { uid } from "./utils";

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
