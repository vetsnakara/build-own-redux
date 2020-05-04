export const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};

export const logger = ({ dispatch, getState }) => (next) => (action) => {
  console.log("action logger: ", action.type);
  next(action);
};

export const bitcoin = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === "ADD_TODO" && action.todo.name.includes("bitcoin")) {
    return alert("BITCOIN id not a good idea!!!");
  }

  return next(action);
};
