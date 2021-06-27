import IUserModel = require('../interfaces/UserModel');

class UserModel {
    private _userModel: IUserModel;

    constructor(private userModel: IUserModel) {
        this._userModel = userModel;
    }

    get firstName(): string {
        return this._userModel.firstName;
    }

    get lastName(): string {
        return this._userModel.lastName;
    }

    get email(): string {
        return this._userModel.email;
    }
    
    get password(): string {
        return this._userModel.password;
    }

    get token(): string {
        return this._userModel.token;
    }

    get salt(): string {
        return this._userModel.salt;
    }

    get reset_password_token(): string {
        return this._userModel.reset_password_token;
    }

    get reset_password_expires(): number {
        return this._userModel.reset_password_expires;
    }

    get createdAt(): Date {
        return this._userModel.createdAt;
    }

    get updatedAt(): Date {
        return this._userModel.updatedAt;
    }

    get lastLogin(): Date {
        return this._userModel.lastLogin;
    }

    get isVerified(): Boolean {
        return this._userModel.isVerified;
    }

    get verificationToken(): string {
        return this._userModel.verificationToken;
    }

}

Object.seal(UserModel);
export = UserModel;