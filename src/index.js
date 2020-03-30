import { createStore } from './store'

// action types
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// action creators
const addTodoAction = todo => ({
  type: ADD_TODO,
  todo
})

const removeTodoAction = id => ({
  type: REMOVE_TODO,
  id
})

const toggleTodoAction = id => ({
  type: TOGGLE_TODO,
  id
})

const addGoalAction = goal => ({
  type: ADD_GOAL,
  goal
})

const removeGoalAction = id => ({
  type: REMOVE_GOAL,
  id
})

// reducers
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

// root reducer
const rootReducer = (state = {}, action) => ({
  todos: todos(state.todos, action),
  goals: goals(state.goals, action)
})

// store
const store = createStore(rootReducer)

// subscribe
store.subscribe(() => console.log('The new state:', store.getState()))

// dispatch todo actions
store.dispatch(addTodoAction({
  id: 0,
  name: 'Learn Redux',
  complete: false
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Learn Pure functions',
  complete: false
}))

store.dispatch(removeTodoAction(0))

store.dispatch(toggleTodoAction(1))

// dispatch goal action
store.dispatch(addGoalAction({
  id: 0,
  name: 'Lose 10 kg'
}))

store.dispatch(addGoalAction({
  id: 1,
  name: 'Learn to fly'
}))

store.dispatch(removeGoalAction(1))
