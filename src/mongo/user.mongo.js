import { UserModel } from "../DAO/models/users.models.js";
import { isValidPassword, createHash } from "../utils/bcrypt.js";
import CustomError from "../service/error/customErrors.js";
import EErros from "../service/error/enums.js";

class UserMongo {
  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      throw CustomError.createError({
        name: "ERROR-VALIDATE",
        cause: "Complete all the fields",
        message: "Complete all the fields for a good validation",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }
  async getAll() {
    const users = await UserModel.find({});
    return users;
  }
  async getUserId(_id) {
    try {
      const user = await UserModel.findOne({ _id });
      return user;
    } catch (e) {
      CustomError.createError({
        name: "ERROR-FIND",
        cause: "Cant found the user in the db",
        message: "Cant found the user in the db",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }
  async getOne(email, password) {
    try {
      const foundUser = await UserModel.findOne({ email });
      if (foundUser && isValidPassword(foundUser, password)) {
        return {
          firstName: foundUser.firstName,
          email: foundUser.email,
          admin: foundUser.admin,
          _id: foundUser._id.toString(),
        };
      } else {
        throw CustomError.createError({
          name: "ERROR-FIND",
          cause: "Cant found the user in the db",
          message: "Cant found the user in the db",
          code: EErros.INVALID_TYPES_ERROR,
        });
      }
    } catch (e) {
      throw CustomError.createError({
        name: "ERROR-FIND",
        cause: "Cant found the user in the db",
        message: "Cant found the user in the db",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }

  async createNewUser(firstName, lastName, age, email, password) {
    try {
      this.validateUser(firstName, lastName, email);
      await UserModel.create({
        firstName,
        lastName,
        age,
        email,
        password: createHash(password),
        admin: false,
        premium: false,
      });
    } catch (e) {
      throw CustomError.createError({
        name: "ERROR-CREATE",
        cause: "Complete all the fields",
        message: "Complete all the fields for a good validation",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }

  async deletedOne(_id) {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateUser(_id, user) {
    try {
      const userUpdated = await userModel.findByIdAndUpdate(_id, user, {
        new: true,
      });
      return userUpdated;
    } catch (e) {
      throw CustomError.createError({
        name: "ERROR-UPDATE",
        cause: "Id user not found",
        message: "The id not found to update this user cart",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }
  async updateUserCart(uid, cartId) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        uid,
        { cart: cartId },
        { new: true }
      );

      if (!updatedUser) {
        throw CustomError.createError({
          name: "ERROR-UPDATE",
          cause: "Id user not found",
          message: "The id not found to update this user cart",
          code: EErros.INVALID_TYPES_ERROR,
        });
      }

      return updatedUser;
    } catch (e) {
      throw CustomError.createError({
        name: "ERROR-UPDATE",
        cause: "Id not found",
        message: "The id not found to update this user",
        code: EErros.INVALID_TYPES_ERROR,
      });
    }
  }
}
export const userModel = new UserMongo();
