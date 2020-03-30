import { createStore } from './store'

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo)
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map(todo => (
        todo.id === action.id
          ? { ...todo, complete: !todo.complete }
          : todo
      ))
    default:
      return state
  }
}

const goals = (state = [], action) => {
  switch (action.type) {
    case ADD_GOAL:
      return [...state, action.goal]
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id)
    default:
      return state
  }
}

const rootReducer = (state = {}, action) => ({
  todos: todos(state.todos, action),
  goals: goals(state.goals, action)
})

const store = createStore(rootReducer)

store.subscribe(() => console.log('The new state:', store.getState()))

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})

store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: 'Learn Pure functions',
    complete: false
  }
})

store.dispatch({
  type: REMOVE_TODO,
  id: 0
})

store.dispatch({
  type: TOGGLE_TODO,
  id: 1
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: 'Lose 10 kg'
  }
})

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: 'Learn to fly'
  }
})

store.dispatch({
  type: REMOVE_GOAL,
  id: 1
})
