import React from "react";
import ReactDOM, { render } from "react-dom";
import { Provider, connect } from "react-redux";

import { Todos } from "./components/Todos";
import { Goals } from "./components/Goals";

import { store } from "./store";
import { handleFetchData } from "./actions";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleFetchData());
  }

  render() {
    if (this.props.loading) {
      return <h3>Loading ...</h3>;
    }

    return (
      <>
        <Todos />
        <Goals />
      </>
    );
  }
}

const ConnectedApp = connect((state) => ({ loading: state.loading }))(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp store={store} />
  </Provider>,
  document.querySelector("#root")
);
