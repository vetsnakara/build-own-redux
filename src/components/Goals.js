import React from "react";

import { List } from "./List";

import { handleAddGoal, handleRemoveGoal } from "../actions";

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
      handleAddGoal(this.state.text, () =>
        this.setState({
          text: "",
        })
      )
    );
  };

  handleGoalRemove = (goal) => {
    this.props.store.dispatch(handleRemoveGoal(goal));
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
