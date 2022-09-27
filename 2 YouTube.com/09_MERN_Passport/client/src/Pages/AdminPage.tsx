import React from "react";
import Axios, { AxiosResponse } from "axios";

import { myContext } from "../Context";
import { UserInterface } from "../Interfaces";

const AdminPage = (): JSX.Element => {
  const ctx = React.useContext(myContext);

  const [data, setData] = React.useState<UserInterface[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<string>("");

  React.useEffect(() => {
    Axios.get("/getallusers", {
      withCredentials: true,
    }).then((res: AxiosResponse) => {
      setData(
        res.data.filter((item: UserInterface) => {
          return item.username !== ctx.username;
        })
      );
    });
  }, [ctx]);
  if (!data) {
    return null as any;
  }

  const deleteUser = async () => {
    let userId: string;
    data.forEach((item: UserInterface) => {
      if (item.username === selectedUser) {
        userId = item.id;
      }
    });

    await Axios.post(
      "/deleteuser",
      {
        id: userId!,
      },
      {
        withCredentials: true,
      }
    );
  };

  return (
    <div>
      <h1>Admin Page, Only Admin's Can See This!</h1>
      <select onChange={(event) => setSelectedUser(event.target.value)} name="deleteuser" id="deleteuser">
        <option id="Select a user">Select A User</option>
        {data.map((item: UserInterface) => {
          return (
            <option key={item.username} id={item.username}>
              {item.username}
            </option>
          );
        })}
      </select>
      <button onClick={deleteUser}>Delete User</button>
    </div>
  );
};

export default AdminPage;
