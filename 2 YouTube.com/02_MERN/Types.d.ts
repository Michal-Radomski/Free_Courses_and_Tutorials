// Types and Interfaces

export interface IUser {
  name: string;
  id: string;
}

export interface CustomError extends Error {
  message: string;
}
