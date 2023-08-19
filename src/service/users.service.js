import { userModel } from "../mongo/user.mongo.js";
import CustomError from "./error/customErrors.js";
import EErros from "./error/enums.js";
//import { userModel } from "../DAO/memory/users.memory.js";

export class UserService {
  async createNewUser(firstName, lastName, age, email, password ) {
    try {
      const newUser = await userModel.createNewUser(
        firstName,
        lastName,
        age,
        email,
        password
        
      );

      return newUser;
    } catch (e) {
      CustomError.createError({
        name: "ERROR-MONGO",
        cause:"Error creating user",
        message:"Error creating user, complete all the fields",
        code:EErros.INVALID_TYPES_ERROR,
    })
    }
  }
  async findAUser(email, password) {
    try {
      const findUser = await userModel.getOne(email, password);
      return findUser;
    } catch (e) {
      CustomError.createError({
        name: "ERROR-MONGO",
        cause:"Error finding user",
        message:"Error finding user, invalid email or password",
        code:EErros.DATABASES_READ_ERROR,
    })
    }
  }

}
