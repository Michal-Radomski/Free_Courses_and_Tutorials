import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

import token from '@/utils/token';
import UserModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import User from '@/resources/user/user.interface';

interface CustomRequest extends Request {
  user?: User;
}

async function authenticatedMiddleware(req: CustomRequest, _res: Response, next: NextFunction): Promise<Response | void> {
  const bearer = req.headers.authorization;
  console.log({bearer});

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(new HttpException(401, 'Unauthorized'));
  }

  const accessToken = bearer.split('Bearer ')[1].trim();
  console.log({accessToken});

  try {
    const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(accessToken);
    console.log({payload});

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Unauthorized'));
    }

    const user = await UserModel.findById(payload.id).select('-password').exec();
    console.log({user});

    if (!user) {
      return next(new HttpException(401, 'Unauthorized'));
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(new HttpException(401, 'Unauthorized'));
  }
}

export default authenticatedMiddleware;
