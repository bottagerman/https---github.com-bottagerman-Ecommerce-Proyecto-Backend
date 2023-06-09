import { connect } from "mongoose";
export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://bottagerman:W6CkrlukQm3hzgsn@cluster0.zsm3uly.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("mongo plug!");
  } catch (e){
    console.log(e)
    throw ("can't connect to the db :(")
  }
}
