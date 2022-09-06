const express = require("express");
var cors = require("cors");

const router = require("./router");

// App
const app = express();

// Middlewares
app.use(cors());

//Route middleware
app.use("/api", router);

// Port
const port = (process.env.PORT || 5000) as number;

app.listen({port: port}, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  // For testing only
  console.log("Current Time:", new Date().toLocaleTimeString());
});
