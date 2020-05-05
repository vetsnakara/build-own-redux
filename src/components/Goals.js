import React from "react";
import { connect } from "../customReactRedux";

import { List } from "./List";

import { handleAddGoal, handleRemoveGoal } from "../actions";

class Goals extends React.Component {
  state = {
    text: "",
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      text: value,
    });
  };

  handleGoalAdd = () => {
    this.props.addGoal(this.state.text, () =>
      this.setState({
        text: "",
      })
    );
  };

  handleGoalRemove = (goal) => {
    this.props.removeGoal(goal);
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

const mapState = (state) => ({
  goals: state.goals,
});

const mapDispatch = (dispatch) => ({
  addGoal: (text, cb) => dispatch(handleAddGoal(text, cb)),
  removeGoal: (goal) => dispatch(handleRemoveGoal(goal)),
});

const ConnectedGoals = connect(mapState, mapDispatch)(Goals);

export { ConnectedGoals as Goals };
