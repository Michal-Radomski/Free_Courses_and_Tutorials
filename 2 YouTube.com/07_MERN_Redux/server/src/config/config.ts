import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const JWT_KEY = process.env.JWT_KEY;
export const FRONTEND_URL = process.env.FRONTEND_URL;

const testAccount_user = process.env.testAccount_user;
const testAccount_pass = process.env.testAccount_pass;
// console.log({ testAccount_pass, testAccount_user });

// Create reusable transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, //* true for 465, false for other ports
  auth: {
    user: testAccount_user, // Generated ethereal user
    pass: testAccount_pass, // Generated ethereal password
  },
});
