import { userModel } from "../mongo/user.mongo.js";
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
      console.log(e);
      throw new Error("Error creating user");
    }
  }
  async findAUser(email, password) {
    try {
      const findUser = await userModel.getOne(email, password);
      return findUser;
    } catch (e) {
      console.log(e);
      throw new Error("Error finding user");
    }
  }

}
