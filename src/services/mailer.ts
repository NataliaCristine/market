import nodemailer from "nodemailer";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const usuario = process.env.USER_MAIL;
const pass = process.env.PASS;

export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: usuario,
    pass: pass,
  },
});

const handlebarOptions: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, "..", "templates"),
    defaultLayout: undefined,
  },
  viewPath: path.resolve(__dirname, "..", "templates"),
};

transport.use("compile", hbs(handlebarOptions));

export const emailGlobal = (
  to: string[],
  subject: string,
  template: string,
  context: any
) => {
  return {
    from: "no-repply@market.com",
    to,
    subject,
    template,
    context,
  };
};

export const mailAll = (
  to: string[],
  subject: string,
  template: string,
  context: any
) => {
  return {
    from: "no-repply@market.com",
    to,
    subject,
    template,
    context,
  };
};
