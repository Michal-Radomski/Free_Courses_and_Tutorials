import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Secret = (): JSX.Element => {
  const navigate = useNavigate();

  React.useEffect(() => {
    const verifyUser = async () => {
      const { data } = await axios.post(
        "/api/check",
        {},
        {
          withCredentials: true,
        }
      );
      // console.log({ data });
      if (!data.status) {
        navigate("/login");
      } else
        toast(`Hi ${data.user}`, {
          theme: "dark",
          position: "top-right",
        });
    };
    verifyUser();
  }, [navigate]);

  const logOut = () => {
    navigate("/login");
  };

  return (
    <React.Fragment>
      <div className="private">
        <h1>Super Secret Page</h1>
        <button onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

export default Secret;
