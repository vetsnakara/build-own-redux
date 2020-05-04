export const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};

export const logger = ({ dispatch, getState }) => (next) => (action) => {
  const stateBefore = getState();
  next(action);
  const stateAfter = getState();

  console.group(action.type);
  console.log("prev state:", stateBefore);
  console.log(("action", action));
  console.log("new state:", stateAfter);
  console.groupEnd(action.type);
};

export const bitcoin = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type === "ADD_TODO" && action.todo.name.includes("bitcoin")) {
    return alert("BITCOIN id not a good idea!!!");
  }

  return next(action);
};
