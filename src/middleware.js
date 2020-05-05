import { applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";

const customThunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};

const customLogger = ({ dispatch, getState }) => (next) => (action) => {
  const stateBefore = getState();
  next(action);
  const stateAfter = getState();

  console.group(action.type);
  console.log("prev state:", stateBefore);
  console.log(("action", action));
  console.log("new state:", stateAfter);
  console.groupEnd(action.type);
};

export const middleware = applyMiddleware(thunk, logger);
