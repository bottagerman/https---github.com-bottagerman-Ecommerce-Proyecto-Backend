import { isValidPassword, createHash } from "../utils/bcrypt.js";

class UsersMemory {
  constructor() {
    this.users = [];
  }

  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      console.log(
        "Validation error: please complete firstName, lastname and email."
      );
      throw new Error(
        "Validation error: please complete firstName, lastname and email."
      );
    }
  }

  async getAll() {
    return this.users;
  }

  async getOne(email, password) {
    try {
      const foundUser = this.users.find(user => user.email === email);
      if (foundUser && isValidPassword(password, foundUser.password)) {
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
      const newUser = {
        firstName,
        lastName,
        age,
        email,
        password: createHash(password),
        admin: false,
      };
      this.users.push(newUser);
    } catch (e) {
      console.log(e);
      throw new Error("Error creating user");
    }
  }

  async deleteOne(_id) {
    const index = this.users.findIndex(user => user._id === _id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return { deletedCount: 1 };
    } else {
      throw new Error("User not found");
    }
  }

  async updateOne(_id, firstName, lastName, email) {
    if (!_id) throw new Error("Invalid _id");
    this.validateUser(firstName, lastName, email);
    const index = this.users.findIndex(user => user._id === _id);
    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        firstName,
        lastName,
        email,
      };
      return this.users[index];
    } else {
      throw new Error("User not found");
    }
  }
}

export const userModel = new UsersMemory();
