import {
  ADD_GOAL,
  ADD_TODO,
  REMOVE_GOAL,
  REMOVE_TODO,
  TOGGLE_TODO,
  FETCH_DATA,
} from "./actions";

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
    case FETCH_DATA:
      return action.todos;
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
    case FETCH_DATA:
      return action.goals;
    default:
      return state;
  }
};

const loading = (state = true, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return false;
    default:
      return state;
  }
};

// root reducer
export const rootReducer = (state = {}, action) => ({
  todos: todos(state.todos, action),
  goals: goals(state.goals, action),
  loading: loading(state.loading, action),
});
