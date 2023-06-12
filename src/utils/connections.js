import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://bottagerman:W6CkrlukQm3hzgsn@cluster0.zsm3uly.mongodb.net/coder?authSource=admin&replicaSet=atlas-ptw4gy-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
    );
    console.log("mongo plug!");
  } catch (e) {
    console.log(e);
    throw "can't connect to the db :(";
  }
}
