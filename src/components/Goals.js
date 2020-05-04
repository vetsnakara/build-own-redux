import React from "react";

import { List } from "./List";

import { addGoalAction, removeGoalAction } from "../actions";
import { addGoal, deleteGoal } from "../api";

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
    addGoal(this.state.text).then((goal) => {
      this.props.store.dispatch(addGoalAction(goal));
      this.setState({
        text: "",
      });
    });
  };

  handleGoalRemove = (goal) => {
    this.props.store.dispatch(removeGoalAction(goal.id));

    deleteGoal(goal.id).catch(() => {
      this.props.store.dispatch(addGoalAction(goal));
      alert("An error occurred. Try again");
    });
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
