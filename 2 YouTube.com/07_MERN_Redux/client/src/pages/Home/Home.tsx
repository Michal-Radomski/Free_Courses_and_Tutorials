import React from "react";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setUser } from "../../redux/state/authSlice";
import { AppDispatch, RootState } from "../../Interfaces";

const Home = (): JSX.Element => {
  const dispatch: AppDispatch = useAppDispatch();
  const { name } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const toast = useToast();

  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/signin");
    dispatch(setUser({ token: null, name: null }));
    toast({
      title: "You are successfully SignedOut",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
  };

  return (
    <React.Fragment>
      <Center style={{ marginTop: "5rem" }}>
        <div style={{ backgroundColor: "lightyellow", padding: "1rem" }}>
          User Name - <span style={{ fontWeight: "bolder" }}>{name}</span> <Button onClick={signOut}>SignOut</Button>
        </div>
      </Center>
    </React.Fragment>
  );
};

export default Home;
