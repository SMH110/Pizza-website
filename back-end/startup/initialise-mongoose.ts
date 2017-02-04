require('mongoose').Promise = Promise;

import * as mongoose from 'mongoose';
import { runMigrations } from '../migrations/migration-runner';

(async function startup() {
    try {
        var options = {
            server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
        };
        console.log('Connecting to MongoDb');
        await mongoose.connect(process.env.CONNECTION_STRING, options);
        console.log('MongoDb connected');
        await runMigrations();
    } catch (error) {
        process.exit(-1);
    }
})();
