const createStore = () => {
  let state

  const getState = () => state

  return {
    getState
  }
}

export default createStore
