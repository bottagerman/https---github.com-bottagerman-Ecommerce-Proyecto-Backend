import { connect } from "mongoose";
import CustomError from "../service/error/customErrors.js";
import EErros from "../service/error/enums.js";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://bottagerman:W6CkrlukQm3hzgsn@cluster0.zsm3uly.mongodb.net/coder?authSource=admin&replicaSet=atlas-ptw4gy-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
    );
    
  } catch (e) {
    CustomError.createError({
      name: "ERROR-MONGO",
      cause:"Error connecting to mongo",
      message:"Error connecting to the db, try again",
      code:EErros.DATABASES_CONNECTION_ERROR,
  })
  }
}
