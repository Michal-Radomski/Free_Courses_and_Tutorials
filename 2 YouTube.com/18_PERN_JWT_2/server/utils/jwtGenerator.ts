import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const jwtGenerator = (user_id: number): string => {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret as string, { expiresIn: "1h" });
};

export default jwtGenerator;
