import React from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../Interfaces";

import * as ACTIONS from "../redux/actions";

interface CustomProps {
  action1(): void;
  action2(): void;
  action_creator1(): void;
  action_creator2(): void;
  user_text: string;
  stateprop1: boolean;
}

class Container1 extends React.Component<CustomProps, RootState> {
  render() {
    return (
      <div>
        <button onClick={() => console.log(this.props.stateprop1)}> Get State </button>
        <button onClick={() => this.props.action1()}> Dispatch Action 1 </button>
        <button onClick={() => this.props.action2()}>Dispatch Action 2 </button>
        <button onClick={() => this.props.action_creator1()}>Dispatch Action Creator 1 </button>
        <button onClick={() => this.props.action_creator2()}>Dispatch Action Creator 2 </button>
        {this.props.user_text ? <h3> {this.props.user_text} </h3> : <h3> No User Text </h3>}
        <br />
        {this.props.stateprop1 ? <p> stateprop1 is true </p> : <p> stateprop1 is false </p>}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    stateprop1: state.reducer1.stateprop1,
    user_text: state.userReducer.user_text,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    action1: () => dispatch(ACTIONS.SUCCESS),
    action2: () => dispatch(ACTIONS.FAILURE),
    action_creator1: () => dispatch(ACTIONS.success()),
    action_creator2: () => dispatch(ACTIONS.failure()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Container1);
