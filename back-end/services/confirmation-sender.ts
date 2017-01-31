import { renderFile } from "ejs";
import { createTransport, Transporter } from "nodemailer";

const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

export async function confirmationSender(order: any, isStoreCopy: boolean) {
    const transporter = createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false,
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    });

    let emailTemplate = await renderEjsTemplate(__dirname + "/email-template.ejs", order, isStoreCopy);
    const mailOptions = {
        from: `'Pizza Godfather' <${SMTP_EMAIL}>`,
        to: isStoreCopy ? SMTP_EMAIL : order.buyer.email,
        subject: `New order - £${order.totalPayment} - ${order.buyer.firstName} ${order.buyer.lastName}`,
        html: emailTemplate
    }

    return sendEmail(transporter, mailOptions);
}

function renderEjsTemplate(template: string, order: Order, isStoreCopy: boolean): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        renderFile(template, { order, isStoreCopy }, (error, html) => {
            if (error) {
                return reject(error);
            }
            resolve(html);
        });
    });
}

function sendEmail(transporter: Transporter, mailOptions: any) {
    return new Promise<string>((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info: any) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
}