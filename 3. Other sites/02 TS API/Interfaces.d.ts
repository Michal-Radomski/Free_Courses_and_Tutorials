// Types and Interfaces

export interface CustomError extends Error {
  errors?: string[];
  message: string;
}
