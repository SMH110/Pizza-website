import * as mongoose from 'mongoose';
import { runMigrations } from '../migrations/migration-runner';


(async function startup() {
    require('mongoose').Promise = Promise;
    
    // Mongoose handles disconnections by throwing an error
    // We don't handle those because they bring the process down and cause Heroku to reboot the app
    // We should look into handling them though because the app could be in the middle of something important
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('MongoDb connected');

    runMigrations();
})();