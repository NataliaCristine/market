"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailMensage = void 0;
const mailer_1 = require("../services/mailer");
const emailMensage = (req, res, next) => {
    const { email, subject, mensagem } = req.body;
    console.log(mensagem);
    try {
        const options = (0, mailer_1.mailAll)([email], subject, "mail", { mensagem: mensagem });
        mailer_1.transport.sendMail(options, function (err, info) {
            if (err) {
                return next(err);
            }
            else {
                console.log(info);
                res.status(200).json({ messagem: "Send email" });
            }
        });
    }
    catch (err) {
        return next(err);
    }
};
exports.emailMensage = emailMensage;
