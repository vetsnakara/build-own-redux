const createStore = (reducer) => {
  let state
  let listeners = []

  const getState = () => state

  const subscribe = listener => {
    // add change state listener
    listeners.push(listener)

    // return unsubscribe function
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  const dispatch = action => {
    // do state change
    state = reducer(state, action)

    // call change state listeners
    listeners.forEach(listener => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

export { createStore }
