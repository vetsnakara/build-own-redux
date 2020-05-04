import React from "react";

import { List } from "./List";

import { addTodoAction, toggleTodoAction, removeTodoAction } from "../actions";
import { addTodo, deleteTodo, toggleTodo } from "../api";

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
    addTodo(this.state.text).then((todo) => {
      this.props.store.dispatch(addTodoAction(todo));
      this.setState({
        text: "",
      });
    });
  };

  handleTodoToggle = (todo) => {
    this.props.store.dispatch(toggleTodoAction(todo.id));

    toggleTodo(todo.id).catch(() => {
      this.props.store.dispatch(toggleTodoAction(todo.id));
      alert("An error occurred. Try again.");
    });
  };

  handleTodoRemove = (todo) => {
    this.props.store.dispatch(removeTodoAction(todo.id));

    deleteTodo(todo.id).catch(() => {
      this.props.store.dispatch(addTodoAction(todo));
      alert("An error occurred.Try again");
    });
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
