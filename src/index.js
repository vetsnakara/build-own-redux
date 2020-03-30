import { createStore } from './store'

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat(action.todo)
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.id)
    case 'TOGGLE_TODO':
      return state.map(todo => (
        todo.id === action.id
          ? { ...todo, complete: !todo.complete }
          : todo
      ))
    default:
      return state
  }
}

const store = createStore(todos)

store.subscribe(() => console.log('The new state:', store.getState()))

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

store.dispatch({
  type: 'REMOVE_TODO',
  id: 0
})

store.dispatch({
  type: 'TOGGLE_TODO',
  id: 1
})
