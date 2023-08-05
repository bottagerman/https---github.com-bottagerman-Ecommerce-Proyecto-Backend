export default class UserService {
  constructor() {
    this.data = [];
  }
   getAll() {
    return this.data;
  }

   getOne() {
    const user = this.data.find({ email, password });
    return user;
  }
   createOne() {
    this.data.push(data)
    return data;
  }

  // async deletedOne(_id) {
  //   const deleted = await UserModel.deleteOne({ _id: _id });
  //   return deleted;
  // }

  // async updateOne(_id, firstName, lastName, email) {
  //   if (!_id) throw new Error("invalid _id");
  //   this.validateUser(firstName, lastName, email);
  //   const userUptaded = await UserModel.updateOne(
  //     { _id: id },
  //     { firstName, lastName, email }
  //   );
  //   return userUptaded;
  // }
}
