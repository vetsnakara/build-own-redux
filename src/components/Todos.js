import React from "react";

import { addTodoAction, toggleTodoAction, removeTodoAction } from "../actions";

import { List } from "./List";

import { uid } from "../utils";

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
      addTodoAction({
        id: uid(),
        name: this.state.text,
        completed: false,
      })
    );

    this.setState({
      text: "",
    });
  };

  handleTodoToggle = (id) => {
    this.props.store.dispatch(toggleTodoAction(id));
  };

  handleTodoRemove = (id) => {
    this.props.store.dispatch(removeTodoAction(id));
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
