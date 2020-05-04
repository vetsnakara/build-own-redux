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
