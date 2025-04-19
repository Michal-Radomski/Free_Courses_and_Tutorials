import { Logger } from "./src/Logger";

const secret = "Secret";

// const logger = new Logger().info("here is the changed SECRET: " + secret);
// console.log("logger:", logger);

new Logger().info("here is the changed SECRET: " + secret);
