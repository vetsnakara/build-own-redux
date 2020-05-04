import React from "react";
import ReactDOM, { render } from "react-dom";

import { Todos } from "./components/Todos";
import { Goals } from "./components/Goals";

import { store } from "./store";
import { fetchGoals, fetchTodos } from "./api";
import { fetchDataAction } from "./actions";

class App extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());

    Promise.all([fetchTodos(), fetchGoals()]).then(([todos, goals]) =>
      this.props.store.dispatch(fetchDataAction(todos, goals))
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { todos, goals, loading } = this.props.store.getState();

    if (loading) {
      return <h3>Loading ...</h3>;
    }

    return (
      <>
        <Todos todos={todos} store={store} />
        <Goals goals={goals} store={store} />
      </>
    );
  }
}

ReactDOM.render(<App store={store} />, document.querySelector("#root"));
