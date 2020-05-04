const createStore = (reducer, initState = {}, enhancer) => {
  if (enhancer) {
    return enhancer(createStore)(reducer, initState);
  }

  let state = initState;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    // add change state listener
    listeners.push(listener);

    // return unsubscribe function
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    // do state change
    state = reducer(state, action);

    // call change state listeners
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
};

const combineReducers = () => ({});

const thunk = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }
  return next(action);
};

const logger = ({ dispatch, getState }) => (next) => (action) => {
  console.log("action logger: ", action.type);
  next(action);
};

const applyMiddleware = (middleware) => (createStore) => (...args) => {
  const store = createStore(...args);
  return {
    ...store,
    dispatch: middleware(store)(store.dispatch),
  };
};

export { createStore, combineReducers, applyMiddleware, thunk, logger };
