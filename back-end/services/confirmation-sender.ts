import { renderFile } from "ejs";
import { createTransport, Transporter } from "nodemailer";
import { BasketService } from '../../shared/services/basket-service';

const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD
    }
});

export async function sendConfirmationEmails(order: Order) {
    try {
        await sendConfirmationToStore(order);
        console.log("Sent confirmation email to the Store");
        await sendConfirmationToUser(order);
        console.log(`Sent confirmation email to the ${order.buyer.email}`);
    } catch (error) {
        console.error(error);
    }
}

async function sendConfirmationToStore(order: Order) {
    const storeEmailTemplate = await renderEjsTemplate(__dirname + "/email-template.ejs", order, true , BasketService.getDescription);
    const mailOptions = {
        from: `'Pizza Godfather' <${SMTP_EMAIL}>`,
        to: SMTP_EMAIL,
        subject: `New order - £${order.totalPayment} - ${order.buyer.firstName} ${order.buyer.lastName}`,
        html: storeEmailTemplate
    };
    return sendEmail(transporter, mailOptions);
}

async function sendConfirmationToUser(order: Order) {
    const storeEmailTemplate = await renderEjsTemplate(__dirname + "/email-template.ejs", order, false , BasketService.getDescription);
    const mailOptions = {
        from: `'Pizza Godfather' <${SMTP_EMAIL}>`,
        to: order.buyer.email,
        subject: `Your order was received`,
        html: storeEmailTemplate
    };
    return sendEmail(transporter, mailOptions);
}

function renderEjsTemplate(template: string, order: Order, isStoreCopy: boolean, getDescription: Function): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        renderFile(template, { order, isStoreCopy , getDescription }, (error, html) => {
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
