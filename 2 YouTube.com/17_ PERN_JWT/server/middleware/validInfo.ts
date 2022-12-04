import { NextFunction, Request, Response } from "express";

const validInfo = function (req: Request, res: Response, next: NextFunction) {
  const { email, name, password } = req.body;

  function validEmail(userEmail: string) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      // console.log(![email, name, password].every(Boolean));
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};

export default validInfo;
