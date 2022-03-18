import nodemailer from "nodemailer";
export declare const transport: nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
export declare const emailGlobal: (to: string[], subject: string, template: string, context: any) => {
    from: string;
    to: string[];
    subject: string;
    template: string;
    context: any;
};
export declare const mailAll: (to: string[], subject: string, template: string, context: any) => {
    from: string;
    to: string[];
    subject: string;
    template: string;
    context: any;
};
