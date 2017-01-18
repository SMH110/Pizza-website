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

const app = express();
//engine
app.engine('html', require('ejs').renderFile);
// view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
//static
app.use(express.static(path.join(__dirname, '..', 'front-end')));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Initialize passport
app.use(passport.initialize());

app.use('/api/order', order);
app.use('/api/admin', admin);
app.use('/api/products', items);
app.use('/', clientSide);

initialisePayPalEndpoints(app);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`Listening on port ${port}`) });