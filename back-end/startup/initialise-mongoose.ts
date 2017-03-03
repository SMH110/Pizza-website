require('mongoose').Promise = Promise;

import * as mongoose from 'mongoose';

(async function startup() {
    while (true) {
        try {
            var options = {
                server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
            };
            console.log('Connecting to MongoDb');
            await mongoose.connect(process.env.CONNECTION_STRING, options);
            console.log('Connected to MongoDb');
            break;
        } catch (error) {
            console.log('Connecting to MongoDb failed... Retrying in 1 second');
            await new Promise(r => setTimeout(r, 1000));
            console.error(error);
        }
    }
})();
