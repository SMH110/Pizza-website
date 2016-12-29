# Prerequisites
1) Sign up to your Paypal account.
2) Create App so Paypal gives you client Id and secret (Username and Password)

# Paypal Integration
1) Obtain an OAuth token by making a POST request to
`https://api.sandbox.paypal.com/v1/oauth2/token` using the client
Id and Secret for the paypal account. Use this on all further requests to PayPal.
See https://developer.paypal.com/docs/integration/direct/make-your-first-call/#curl-access-token-request-example

-> TODO: Always get a new token for each request to PayPal

2) Make a POST request to `https://api.sandbox.paypal.com/v1/payments/payment`
with the transaction details. You should provide the return_url and cancel_url which are
the links the user will be redirected to when they complete/cancel their payment.
See https://developer.paypal.com/docs/integration/web/accept-paypal-payment/#request

3) If the state is 'created' then you should also get back several links.
Redirect the client to the approval_url link. If the state is anything else
then log the response and tell the user there was a problem placing the order.

-> TODO: Only give the client the approval_url link, nothing else...

4) Don't worry about what happens now... the user is dealing with PayPal

5) An endpoint should exist in your app which the user will be redirected to
once they have finished paying (the return_url you provided to PayPal when
you created the transaction). The client will have their PayerID and paymentId
in the query string. When the client hits this endpoint, you should call the
execute URL, posting the payer_id.
See https://developer.paypal.com/docs/integration/web/accept-paypal-payment/#execute-the-payment

-> TODO: Send to NodeJS the PayerID and PaymentID from the client (which is in their query string)

6) If you get anything other than a 200 then log it and tell the user there
was a problem completing their payment. Otherwise show them the order successful
screen.




/payment-processing
ON THIS PAGE, IT WOULD BE NICE TO DISPLAY A SPINNER OR SOMETHING INDICATING
THAT THE PAYMENT IS BEING PROCESSED
1) Get the stuff from the query string (PayerID and paymentId)
2) Post them up to Node JS
3) INSIDE NODE JS - execute the payment (steps 5 and 6 above)
4) INSIDE NODE JS - return either a 200 or whatever based on the execution outcome
5) On Angular, redirect the user to...
/payment-complete or /order-successful