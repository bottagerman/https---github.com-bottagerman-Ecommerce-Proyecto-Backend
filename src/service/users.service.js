import UserDTO from "../DTO/users.dto.js";
import { userModel } from "../mongo/user.mongo.js";
import { loggerDev } from "../utils/logger.js";
import CustomError from "./error/customErrors.js";
import EErros from "./error/enums.js";
//import { userModel } from "../DAO/memory/users.memory.js";

export class UserService {
  async createNewUser(firstName, lastName, age, email, password) {
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
        cause: "Error creating user",
        message: "Error creating user, complete all the fields",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }
  async getAll() {
    try {
      const allUsers = await userModel.getAll();
      return allUsers;
    } catch (e) {
      throw new Error("Can't get all the users");
    }
  }
  async getUserId(_id) {
    try {
      const user = await userModel.getUserId(_id);
      return user;
    } catch (e) {
      CustomError.createError({
        name: "ERROR-MONGO",
        cause: "Error finding user",
        message: "Error finding user, invalid email or password",
        code: EErros.DATABASES_READ_ERROR,
      });
    }
  }
  async updatedUser(id, user) {
    const userUpdated = await userModel.updateUser(id, user);
    return userUpdated;
  }
  async findAUser(email, password) {
    try {
      const findUser = await userModel.getOne(email, password);
      return findUser;
    } catch (e) {
      CustomError.createError({
        name: "ERROR-MONGO",
        cause: "Error finding user",
        message: "Error finding user, invalid email or password",
        code: EErros.DATABASES_READ_ERROR,
      });
    }
  }
  async toPremium(id) {
    try {
      const user = await this.getUserId({ id });
      if (!user) {
        throw new Error("cant find this user");
      }
      user.premium = !user.premium;

      const premiumUser = await this.updatedUser(id, {
        premium: user.premium,
      });
      return premiumUser;
    } catch (e) {
      CustomError.createError({
        name: "ERROR-MONGO",
        cause: "Error finding user",
        message: "Error finding user, invalid email or password",
        code: EErros.DATABASES_READ_ERROR,
      });
    }
  }
}
