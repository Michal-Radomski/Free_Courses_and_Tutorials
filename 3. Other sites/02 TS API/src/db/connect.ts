import mongoose from "mongoose";
import config from "config";

import log from "../logger/index";

function connect() {
  const dbUri = config.get("dbUri") as string;

  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con: {connection: {host: string}}) => {
      log.info(`MongoDB Database connected with HOST: ${con.connection.host}`);
    })
    .catch((error: string) => {
      log.error("DB connection error", error);
      process.exit(1);
    });
}

export default connect;
