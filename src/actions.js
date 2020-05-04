import * as api from "./api";

// action types
export const ADD_TODO = "ADD_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

export const ADD_GOAL = "ADD_GOAL";
export const REMOVE_GOAL = "REMOVE_GOAL";

export const FETCH_DATA = "FETCH_DATA";

// action creators
export const addTodoAction = (todo) => ({
  type: ADD_TODO,
  todo,
});

export const removeTodoAction = (id) => ({
  type: REMOVE_TODO,
  id,
});

export const toggleTodoAction = (id) => ({
  type: TOGGLE_TODO,
  id,
});

export const addGoalAction = (goal) => ({
  type: ADD_GOAL,
  goal,
});

export const removeGoalAction = (id) => ({
  type: REMOVE_GOAL,
  id,
});

export const fetchDataAction = (todos, goals) => ({
  type: FETCH_DATA,
  todos,
  goals,
});

// thunks

export const handleAddTodo = (name, cb) => (dispatch) => {
  api.addTodo(name).then((todo) => {
    dispatch(addTodoAction(todo));
    cb();
  });
};

export const handleRemoveTodo = (todo) => (dispatch) => {
  // optimistic remove todo
  dispatch(removeTodoAction(todo.id));

  api.deleteTodo(todo.id).catch(() => {
    dispatch(addTodoAction(todo));
    alert("An error occurred.Try again");
  });
};

export const handleToggleTodo = (id) => (dispatch) => {
  // optimistic toggle todo
  dispatch(toggleTodoAction(id));

  api.toggleTodo(id).catch(() => {
    dispatch(toggleTodoAction(id));
    alert("An error occurred. Try again.");
  });
};

export const handleAddGoal = (name, cb) => (dispatch) => {
  api.addGoal(name).then((goal) => {
    dispatch(addGoalAction(goal));
    cb();
  });
};

export const handleRemoveGoal = (goal) => (dispatch) => {
  dispatch(removeGoalAction(goal.id));

  api.deleteGoal(goal.id).catch(() => {
    dispatch(addGoalAction(goal));
    alert("An error occurred. Try again");
  });
};
