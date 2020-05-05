import React from "react";

const StoreContext = React.createContext();

export const Provider = ({ children, store }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const connect = (
  mapStateToProps = () => {},
  mapDispatchToProps = () => {}
) => (Component) =>
  class extends React.Component {
    static contextType = StoreContext;

    state = {
      ...mapStateToProps(this.context.getState(), this.props),
      ...mapDispatchToProps(this.context.dispatch, this.props),
    };

    componentDidMount() {
      const store = this.context;
      this.unsubscribe = store.subscribe(this.updateStateProps);
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    updateStateProps = () => {
      this.setState({
        ...mapStateToProps(this.context.getState(), this.props),
        ...mapDispatchToProps(this.context.dispatch, this.props),
      });
    };

    render() {
      const store = this.context;

      return (
        <Component {...this.props} dispatch={store.dispatch} {...this.state} />
      );
    }
  };
