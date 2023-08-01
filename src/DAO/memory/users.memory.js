export default class UserService {
  constructor() {
    this.data = [];
  }
  async getAll() {
    return this.data;
  }

  async getOne() {
    const user = await UserModel.findOne({ email, password });
    return user;
  }
  async createOne() {
    this.data.push(data)
    return data;
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
}
