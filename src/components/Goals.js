import React from "react";

import { List } from "./List";

import { addGoalAction, removeGoalAction } from "../actions";

import { uid } from "../utils";

export class Goals extends React.Component {
  state = {
    text: "",
  };

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      text: value,
    });
  };

  handleGoalAdd = () => {
    this.props.store.dispatch(
      addGoalAction({
        id: uid(),
        name: this.state.text,
      })
    );

    this.setState({
      text: "",
    });
  };

  handleGoalRemove = (id) => {
    this.props.store.dispatch(removeGoalAction(id));
  };

  render() {
    const { text } = this.state;
    const { goals } = this.props;

    return (
      <div>
        <h2>Goals</h2>
        <input
          value={text}
          name="goal"
          onChange={this.handleChange}
          type="text"
          placeholder="Add Goal"
        />
        <button onClick={this.handleGoalAdd}>Add Goal</button>
        <List items={goals} onRemove={this.handleGoalRemove} />
      </div>
    );
  }
}
