export default class UserDTO {
    constructor(user) {
        this.fullname = user.firstName + " " + user.lastName,
        this.email = user.email,
        this.age = user.age,
        this.premium = user.premium,
        this.admin = user.admin,
        this.cart = user.cart
    }
}