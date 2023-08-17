import { UserModel } from "../DAO/models/users.models.js";
import { isValidPassword, createHash } from "../utils/bcrypt.js";

class UserMongo {
  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      console.log(
        "validation error: please complete firstName, lastname and email."
      );
      throw new Error(
        "validation error: please complete firstName, lastname and email."
      );
    }
  }
  async getAll() {
    const users = await UserModel.find({});
    return users;
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
        throw new Error("Invalid email or password");
      }
    } catch (e) {
      console.log(e);
      throw new Error("Error finding user");
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
      });
    } catch (e) {
      console.log(e);
      throw new Error("Error creating user");
    }
  }

  async deletedOne(_id) {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(_id, firstName, lastName, email) {
    if (!_id) throw new Error("invalid _id");
    this.validateUser(firstName, lastName, email);
    const userUptaded = await UserModel.updateOne(
      { _id: id },
      { firstName, lastName, email }
    );
    return userUptaded;
  }
  async updateUserCart(userId, cartId) {
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        { cart: cartId },
        { new: true }
      );
  
      if (!updatedUser) {
        throw new Error("User not found");
      }
  
      return updatedUser;
    } catch (e) {
      console.log(e);
      throw new Error("Error updating user's cart");
    }
  }
}
export const userModel = new UserMongo();
