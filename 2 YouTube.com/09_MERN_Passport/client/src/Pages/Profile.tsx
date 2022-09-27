import React from "react";

import { myContext } from "../Context";

const Profile = (): JSX.Element => {
  const ctx = React.useContext(myContext);
  console.log({ ctx });

  return (
    <div>
      <h1>Current Logged In User: {ctx.username}</h1>
      <h3>Current Logged ID: {ctx.id}</h3>
      <h3>Current Logged User isAdmin: {ctx.isAdmin!.toString()}</h3>
    </div>
  );
};

export default Profile;
