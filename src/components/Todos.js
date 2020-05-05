import React from "react";
import { connect } from "react-redux";

import { List } from "./List";

import { handleAddTodo, handleRemoveTodo, handleToggleTodo } from "../actions";

class Todos extends React.Component {
  state = {
    text: "",
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      text: value,
    });
  };

  handleTodoAdd = () => {
    this.props.addTodo(this.state.text, () =>
      this.setState({
        text: "",
      })
    );
  };

  handleTodoToggle = (todo) => {
    this.props.toggleTodo(todo.id);
  };

  handleTodoRemove = (todo) => {
    this.props.removeTodo(todo);
  };

  render() {
    const { text } = this.state;
    const { todos } = this.props;

    return (
      <div>
        <h2>Todo List</h2>

        <input
          value={this.state.text}
          name="todo"
          onChange={this.handleChange}
          type="text"
          placeholder="Add Todo"
        />

        <button onClick={this.handleTodoAdd}>Add Todo</button>

        <List
          items={todos}
          onRemove={this.handleTodoRemove}
          onToggle={this.handleTodoToggle}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  todos: state.todos,
});

const mapDispatch = (dispatch) => ({
  addTodo: (text, cb) => dispatch(handleAddTodo(text, cb)),
  toggleTodo: (id) => dispatch(handleToggleTodo(id)),
  removeTodo: (todo) => dispatch(handleRemoveTodo(todo)),
});

const ConnectedTodos = connect(mapState, mapDispatch)(Todos);

export { ConnectedTodos as Todos };
