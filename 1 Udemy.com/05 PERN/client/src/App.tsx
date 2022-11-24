import React from "react";
import axios from "axios";

import "./App.scss";

function App(): JSX.Element {
  const axiosInstance = axios.create({
    baseURL: "/api",
    timeout: 1000,
    headers: { "Content-Type": "application/json" },
  });

  const [hello, setHello] = React.useState<string>("");

  //* componentDidMount in functional component
  React.useEffect(() => {
    // axios
    //   .get("/api/hello")
    //   .then((response) => {
    //     console.log(response.data);
    //     setHello(response.data.msg);
    //   })
    //   .catch((error) => {
    //     console.log({ error });
    //   });

    const fetchData = async () => {
      try {
        await axiosInstance({
          url: "/hello",
          method: "GET",
        }).then((response) => {
          console.log(response.data);
          setHello(response.data.msg);
        });
      } catch (error) {
        console.error({ error });
      }
    };
    fetchData();
  });

  return (
    <React.Fragment>
      PERN App
      <br />
      {hello}
    </React.Fragment>
  );
}

export default App;
