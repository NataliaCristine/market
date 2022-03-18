import { transport, mailAll } from "../services/mailer";
import { NextFunction, Request, Response } from "express";

export const emailMensage = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, subject, mensagem } = req.body;

  try {
    const options = mailAll([email], subject, "mail", { mensagem: mensagem });
    transport.sendMail(options, function (err, info) {
      if (err) {
        return next(err);
      } else {
        return res.status(200).json({ messagem: "Send email" });
      }
    });
  } catch (err) {
    return next(err);
  }
};
