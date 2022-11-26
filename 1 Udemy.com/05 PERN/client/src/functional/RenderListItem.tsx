import React from "react";

import { RootState } from "../Interfaces";

const RenderListItem = (props: RootState): JSX.Element => (
  <React.Fragment>
    <h3>{props.location.state.list_item.text}</h3>
    <h4> {props.location.state.list_item.num} </h4>
    <div>{props.location.state.list_item.bool ? <p>Boolean is True</p> : <p>Boolean is False</p>}</div>
  </React.Fragment>
);

export default RenderListItem;
