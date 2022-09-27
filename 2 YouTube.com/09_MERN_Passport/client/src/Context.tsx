import React from "react";
import Axios, { AxiosResponse } from "axios";

import { UserInterface } from "./Interfaces";

export const myContext = React.createContext<Partial<UserInterface>>({ id: "", username: "", isAdmin: false });

export default function Context(props: React.PropsWithChildren<any>): JSX.Element {
  const [user, setUser] = React.useState<UserInterface>({ id: "", username: "", isAdmin: false });
  console.log({ user });

  React.useEffect(() => {
    Axios.get("/user", { withCredentials: true }).then((res: AxiosResponse) => {
      console.log("res.data:", res.data);
      setUser(res.data);
    });
  }, []);

  return <myContext.Provider value={user!}>{props.children}</myContext.Provider>;
}
