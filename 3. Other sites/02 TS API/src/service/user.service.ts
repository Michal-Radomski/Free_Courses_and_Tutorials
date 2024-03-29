import {DocumentDefinition, FilterQuery} from "mongoose";
import {omit} from "lodash";

import User, {UserDocument} from "../model/user.model";

export async function createUser(input: DocumentDefinition<UserDocument>) {
  // console.log({input});
  try {
    return await User.create(input);
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  // console.log("User.findOne(query).lean():", User.findOne(query).lean());
  // console.log("User.findOne(query):", User.findOne(query));
  return User.findOne(query).lean();
}

export async function validatePassword({email, password}: {email: UserDocument["email"]; password: string}) {
  const user = await User.findOne({email});

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(user.toJSON(), "password");
}
