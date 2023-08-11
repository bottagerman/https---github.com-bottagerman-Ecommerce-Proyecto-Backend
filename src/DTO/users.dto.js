export default class UserDTO {
    constructor(user) {
        this.fullname = user.firstName + " " + user.lastName,
        this.email = user.email,
        this.admin = user.admin
    }
}