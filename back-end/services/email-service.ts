import { renderFile } from "ejs";
import { createTransport } from "nodemailer";
import { BasketService } from '../../shared/services/basket-service';
import * as moment from 'moment';

const STORE_EMAIL_ADDRESS = process.env.SMTP_EMAIL;

export async function sendOrderPlacedEmail(order: Order) {
    await sendPlaceOrderEmailToStore(order);
    await sendPlaceOrderEmailToUser(order);
}

export async function sendOrderConfirmedEmail(order: Order, readyInMinutes: number) {
    let readyInText = moment(Date.now()).add(readyInMinutes, 'minutes').fromNow();
    let html = await renderEjsTemplate(__dirname + "/order-confirmed.ejs", { order, readyInMinutes, readyInText });
    await sendEmail(order.buyer.email, "Your order has been confirmed", html);
}

export async function sendVoucherCode(voucher: Voucher) {
    let subject = `£${voucher.amount} off your next order at Godfather Pizza Wood Oven`;
    let html = await renderEjsTemplate(__dirname + "/voucher-code.ejs", { voucher });
    await sendEmail(voucher.email, subject, html);
}

async function sendPlaceOrderEmailToStore(order: Order) {
    let subject = `New order placed - £${order.totalPayment} - ${order.buyer.firstName} ${order.buyer.lastName}`;
    let html = await renderEjsTemplate(__dirname + "/order-placed.ejs", { order, isStoreCopy: true, getDescription: BasketService.getDescription });
    await sendEmail(STORE_EMAIL_ADDRESS, subject, html);
}

async function sendPlaceOrderEmailToUser(order: Order) {
    let html = await renderEjsTemplate(__dirname + "/order-placed.ejs", { order: order, isStoreCopy: false, getDescription: BasketService.getDescription });
    await sendEmail(order.buyer.email, "Your order has been placed", html);
}

function renderEjsTemplate(template: string, data: any): Promise<string> {
    return new Promise<string>((resolve, reject) => renderFile(template, data, (error, html) => error ? reject(error) : resolve(html)));
}

const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: STORE_EMAIL_ADDRESS,
        pass: process.env.SMTP_PASSWORD
    }
});

async function sendEmail(recipientEmail: string, subject: string, html: string) {
    try {
        await transporter.sendMail({ from: `'Godfather Pizza' <${STORE_EMAIL_ADDRESS}>`, to: recipientEmail, subject, html });
        console.log(`Successfully sent email ${subject} to ${recipientEmail}`);
    } catch (error) {
        console.error(`Error sending email ${subject} to ${recipientEmail}`, error);
    }
}
