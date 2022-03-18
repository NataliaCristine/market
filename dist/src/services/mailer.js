"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailAll = exports.emailGlobal = exports.transport = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(
  require("nodemailer-express-handlebars")
);
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.USER_MAIL);
const usuario = process.env.USER_MAIL;
const pass = process.env.PASS;
exports.transport = nodemailer_1.default.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: usuario,
    pass: pass,
  },
});
const handlebarOptions = {
  viewEngine: {
    partialsDir: path_1.default.resolve(__dirname, "..", "templates"),
    defaultLayout: undefined,
  },
  viewPath: path_1.default.resolve(__dirname, "..", "templates"),
};
exports.transport.use(
  "compile",
  (0, nodemailer_express_handlebars_1.default)(handlebarOptions)
);
const emailGlobal = (to, subject, template, context) => {
  return {
    from: "no-repply@market.com",
    to,
    subject,
    template,
    context,
  };
};
exports.emailGlobal = emailGlobal;
const mailAll = (to, subject, template, context) => {
  return {
    from: "no-repply@market.com",
    to,
    subject,
    template,
    context,
  };
};
exports.mailAll = mailAll;
