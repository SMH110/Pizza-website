import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import { initialisePayPalEndpoints } from './payment-gateways/paypal';

import './config/passport.config';

// TODO: Check how mongoose handles app disconnections
require('mongoose').Promise = Promise;
mongoose.connect('mongodb://SMH110:yaaAli@ds127948.mlab.com:27948/pizza-delivery', (error) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log('MongoDb connected');
});

import clientSide from './router/client-side';
import items from './router/items';
import order from './router/order';
import admin from './router/admin';
import health from './router/health';

const app = express();
const nocache = require('nocache');

// View engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));

// Static Files
app.use('/shared', express.static(path.join(__dirname, '..', 'shared')));
app.use(express.static(path.join(__dirname, '..', 'front-end')));


// JSON Requests
app.use(bodyParser.json())

// Initialize passport
app.use(passport.initialize());

// Register Routes
app.use('/api/order', nocache(), order);
app.use('/api/admin', nocache(), admin);
app.use('/api/products', nocache(), items);
app.use('/health', health);
app.use(nocache(), clientSide);

// Register Payment Gateways
initialisePayPalEndpoints(app);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}`) });