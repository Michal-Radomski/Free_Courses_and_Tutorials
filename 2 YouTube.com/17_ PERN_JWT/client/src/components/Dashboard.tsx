import React from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }: { setAuth(arg0: boolean): void }): JSX.Element => {
  const [name, setName] = React.useState<string>("");

  const getProfile = async () => {
    try {
      const res = await fetch("/api/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.jwt_token },
      });

      const parseData = await res.json();
      setName(parseData.user_name);
    } catch (error) {
      console.error({ error });
    }
  };

  const logout = async (event: any) => {
    event.preventDefault();
    try {
      localStorage.removeItem("jwt_token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (error) {
      console.error({ error });
    }
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <React.Fragment>
      <div>
        <h1 className="mt-5">Dashboard</h1>
        <h2>Welcome {name}</h2>
        <button onClick={(event) => logout(event)} className="btn btn-primary">
          Logout
        </button>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
