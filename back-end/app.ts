import './config/dev.config';
import './startup/initialise-mongoose';

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';

import { initialisePayPalEndpoints } from './payment-gateways/paypal';
import { initialiseBarclaysEPDQEndpoints } from './payment-gateways/barclays-epdq';

import clientSide from './router/client-side';
import order from './router/order';
import admin from './router/admin';
import health from './router/health';
import payment from './router/payment';

const app = express();
const nocache = require('nocache');

// Static Files
app.use(express.static(path.join(__dirname, '..', 'dist')));

// JSON Requests
app.use(bodyParser.json())

// Register Routes
app.use('/api/order', nocache(), order);
app.use('/api/admin', nocache(), admin);
app.use('/api/payment', nocache(), payment);
app.use('/health', health);
app.use(nocache(), clientSide);

// Register Payment Gateways
initialisePayPalEndpoints(app);
initialiseBarclaysEPDQEndpoints(app);

const port = process.env.PORT;
app.listen(port, () => { console.log(`Listening on port ${port}`) });
