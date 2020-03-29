import { createStore } from './store'

const todos = (state = [], action) => {
  if (action.type === 'ADD_TODO') {
    return state.concat(action.todo)
  }
  return state
}

const store = createStore(todos)

const unsubscribe = store.subscribe(() => console.log('The new state:', store.getState()))

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 1,
    name: 'Learn Pure functions',
    complete: false
  }
})

unsubscribe()

store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 2,
    name: 'Learn Node.js',
    complete: false
  }
})
