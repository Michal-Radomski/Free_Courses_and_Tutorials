import React from "react";

const Dashboard = ({ setAuth }: { setAuth(arg0: boolean): void }): JSX.Element => {
  console.log({ setAuth });
  return (
    <React.Fragment>
      Dashboard
      <button onClick={() => setAuth(false)}>LogOut</button>
    </React.Fragment>
  );
};

export default Dashboard;
