require("mongoose").Promise = Promise;

import * as mongoose from "mongoose";
import { storeError } from "../services/error-service";

(async function startup() {
  while (true) {
    try {
      console.log("Connecting to MongoDb");
      console.log(process.env.CONNECTION_STRING);
      await mongoose.connect(
        process.env.CONNECTION_STRING,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      );
      console.log("Connected to MongoDb");
      break;
    } catch (error) {
      storeError(error);
      console.log("Connecting to MongoDb failed... Retrying in 1 second");
      await new Promise(r => setTimeout(r, 1000));
      console.error(error);
    }
  }
})();
