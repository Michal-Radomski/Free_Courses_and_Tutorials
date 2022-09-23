import { Request, RequestHandler, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET as string;

interface CustomRequest extends Request {
  userId?: string;
}

const authMiddleware: RequestHandler = async (req: CustomRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    // console.log({ token });
    const isCustomAuth = token?.length! < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);
      // console.log({ decodedData });
      req.userId = (decodedData as jwt.JwtPayload)?.id;
      // console.log("req.userId:", req.userId);
    } else {
      decodedData = jwt.decode(token as string);
      console.log({ decodedData });

      req.userId = decodedData?.sub as string;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleware;
