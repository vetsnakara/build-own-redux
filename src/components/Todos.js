import React from "react";

import { List } from "./List";

import { handleAddTodo, handleRemoveTodo, handleToggleTodo } from "../actions";

export class Todos extends React.Component {
  state = {
    text: "",
  };

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      text: value,
    });
  };

  handleTodoAdd = () => {
    this.props.store.dispatch(
      handleAddTodo(this.state.text, () =>
        this.setState({
          text: "",
        })
      )
    );
  };

  handleTodoToggle = (todo) => {
    this.props.store.dispatch(handleToggleTodo(todo.id));
  };

  handleTodoRemove = (todo) => {
    this.props.store.dispatch(handleRemoveTodo(todo));
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
