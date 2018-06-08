import { renderFile } from "ejs";
import { createTransport } from "nodemailer";
import { BasketService } from '../../shared/services/basket-service';
import * as moment from 'moment';
import { storeError } from "./error-service";

const STORE_EMAIL_ADDRESS = process.env.SMTP_EMAIL;

export async function sendOrderPlacedEmail(order: Order) {
    await sendPlaceOrderEmailToStore(order);
    await sendPlaceOrderEmailToUser(order);
}

export async function sendOrderConfirmedEmail(order: Order, voucher: Voucher, readyInMinutes: number) {
    let readyInText = moment(Date.now()).add(readyInMinutes, 'minutes').fromNow();
    let expiresOn = moment(voucher.expiryDate).format('dddd Do MMM [at] HH:mm');
    let html = await renderEjsTemplate(__dirname + "/order-confirmed.ejs", { order, voucher, readyInMinutes, readyInText, expiresOn });
    await sendEmail(order.buyer.email, "Your order has been confirmed + 10% off when you next order!", html);
}

export async function sendVoucherCode(voucher: Voucher) {
    let subject = `£${voucher.amount} off your next order at Godfather Pizza`;
    let expiresIn = moment(voucher.expiryDate).fromNow();
    let expiresOn = moment(voucher.expiryDate).format('dddd Do MMM [at] HH:mm');
    let html = await renderEjsTemplate(__dirname + "/voucher-code.ejs", { voucher, expiresIn, expiresOn });
    await sendEmail(voucher.email, subject, html);
}

export async function sendVoucherReminder(voucher: Voucher) {
    let subject = `Your £${voucher.amount} voucher expires soon`;
    let expiresIn = moment(voucher.expiryDate).fromNow();
    let expiresOn = moment(voucher.expiryDate).format('dddd Do MMM [at] HH:mm');
    let html = await renderEjsTemplate(__dirname + "/voucher-reminder.ejs", { voucher, expiresIn, expiresOn });
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

const FAILED_EMAILS: FailedEmail[] = [];

async function sendEmail(recipientEmail: string, subject: string, html: string) {
    try {
        await transporter.sendMail({ from: `'Godfather Pizza' <${STORE_EMAIL_ADDRESS}>`, to: recipientEmail, subject, html });
        console.log(`Successfully sent email ${subject} to ${recipientEmail}`);
    } catch (error) {
        FAILED_EMAILS.push({ recipientEmail, subject, html });
        storeError(error);
        console.error(`Error sending email ${subject} to ${recipientEmail}`, error);
    }
}

export async function resendFailedEmails() {
    let emails = FAILED_EMAILS.splice(0, FAILED_EMAILS.length);
    for (let email of emails) {
        await sendEmail(email.recipientEmail, email.subject, email.html);
        await new Promise(r => setTimeout(r, 5000));
    }
}

interface FailedEmail {
    recipientEmail: string;
    subject: string;
    html: string;
}
