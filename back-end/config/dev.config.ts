// Our cloud provider always gives us a PORT environment variable
// If it's not there, assume we're running locally so set up the config.
if (!process.env.PORT) {
    process.env.PORT = 3000;

    // Generated using https://github.com/dwyl/hapi-auth-jwt2#generating-your-secret-key
    process.env.PASSPORT_SECRET = "apbseMS8rs3YBvP4TmR6ZANqo/1PumjYxvupWK5qgBWCcziG3scu3iXrYPdGt624Hqij+eHtjYO4UsyS8boB/cey0q+u3oaG3B2n5PnZSuw9IZQ2BR5d4E4DtSwakXVMT2mT3cPTfGH2LTEWbp8ZhtRNvYBJ9S4ShQkPlj0Zzzu5TIusRxagIILGUF2XwkuBgsYR34umb6x+kVpLH92sTjz0VSe7IhgGYoR0K8d7eNLh6kNp5N3IK1y7W3xTCn+w24wBeRX2fTzuvurmX16Jb4wRLrOjyZ3SXROTMYyWAAVjh+5V9u4Xk2SY1wKsSa1bVBwu7n4ct9yoxicueSYUKw==";

    process.env.CONNECTION_STRING = "mongodb://SMH110:yaaAli@ds127948.mlab.com:27948/pizza-delivery";
    process.env.ADMIN_EMAIL = "test@test.com";
    process.env.ADMIN_PASSWORD = "test";

    // PayPal
    process.env.PAYPAL_ENABLED = "TRUE";
    process.env.PAYPAL_CLIENT_ID = "AWIevBHnu9162GxBPIu9kqyNU-EB2YItx6jF6fEqQrRlqZ9I9G49tNePR_4q0IMJCRPw3XYUZbMrLEjx";
    process.env.PAYPAL_SECRET = "EHFGmfZjwI5n70O9Uo73MEIIyzd0hv3mGEo0NyErBEeNXJfXOyiwa57NN4gPrQ9HA5L7EmphXyU7Vr9r";

    // Barclays EPDQ
    process.env.BARCLAYS_EPDQ_ENABLED = "TRUE";
    process.env.BARCLAYS_EPDQ_ENVIRONMENT_NAME = "test";
    process.env.BARCLAYS_EPDQ_PSPID = "CSHARPANDSONS";
    process.env.BARCLAYS_EPDQ_SHA_IN = "m770110578nOy80vxnqN558T69V9711788hzhxCfK8348sMRa8e98180214606yQ";
    process.env.BARCLAYS_EPDQ_SHA_OUT = "LwvcFTOBcyZacvXBDrwFFNgBSIhDfpHYj2TC01uzG4sDbtF2pNSqJPzRkJKuTEfD";

    // Outlook
    process.env.SMTP_EMAIL = "pizza-delivery-website-test@outlook.com";
    process.env.SMTP_PASSWORD = "^yO*#A30$4(x01H";
}

