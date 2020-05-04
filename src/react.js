import React from "react";
import ReactDOM, { render } from "react-dom";

import { Todos } from "./components/Todos";
import { Goals } from "./components/Goals";

import { store } from "./store";

class App extends React.Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { todos, goals } = this.props.store.getState();

    return (
      <>
        <Todos todos={todos} store={store} />
        <Goals goals={goals} store={store} />
      </>
    );
  }
}

ReactDOM.render(<App store={store} />, document.querySelector("#root"));
