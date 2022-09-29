import React from "react";
import axios from "axios";

import "./App.scss";

function App(): JSX.Element {
  const [email, setEmail] = React.useState<string>("");

  const sendEmail = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const data = {
      email: email,
    };

    const response = await axios.post("http://localhost:5000/api/send-email", data);
    console.log("response.data:", response.data);
  };

  return (
    <div className="--flex-center --bg-primary --100vh">
      <div className="--width-500px --card --p --bg-light">
        <form className="--form-control" onSubmit={sendEmail}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <button type="submit" className="--btn --btn-primary">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
