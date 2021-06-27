"use strict";
class UserModel {
    constructor(userModel) {
        this.userModel = userModel;
        this._userModel = userModel;
    }
    get firstName() {
        return this._userModel.firstName;
    }
    get lastName() {
        return this._userModel.lastName;
    }
    get email() {
        return this._userModel.email;
    }
    get password() {
        return this._userModel.password;
    }
    get token() {
        return this._userModel.token;
    }
    get salt() {
        return this._userModel.salt;
    }
    get reset_password_token() {
        return this._userModel.reset_password_token;
    }
    get reset_password_expires() {
        return this._userModel.reset_password_expires;
    }
    get createdAt() {
        return this._userModel.createdAt;
    }
    get updatedAt() {
        return this._userModel.updatedAt;
    }
    get lastLogin() {
        return this._userModel.lastLogin;
    }
    get isVerified() {
        return this._userModel.isVerified;
    }
    get verificationToken() {
        return this._userModel.verificationToken;
    }
}
Object.seal(UserModel);
module.exports = UserModel;
//# sourceMappingURL=UserModel.js.map