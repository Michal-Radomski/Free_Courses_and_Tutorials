import { Request, RequestHandler, Response } from "express";

export const getHomePage: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  await console.log("req.ip:", req.ip);
  await res.render("home", {});
};
