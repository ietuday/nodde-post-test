"use strict";
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const async = require('async');
;
const UserRepository = require("../../repository/user/UserRepository");
class UserBusiness {
    constructor() {
        this.saltLength = 10;
        this._UserRepository = new UserRepository();
    }
    create(user, callback) {
        const hash = this.saltHashPassword(user.password);
        user.password = hash.password;
        user.salt = hash.salt;
        this._UserRepository.create(user, callback);
    }
    login(email, password, callback) {
        async.waterfall([
            (done) => {
                this._UserRepository.findUserByEmail(email, (error, result) => {
                    if (result) {
                        if (!result.isVerified) {
                            return done('Your account has not been verified', null);
                        }
                        const userPassword = this.hashPasswordWithSalt(password, result.salt);
                        if (result.password === userPassword.password) {
                            const payload = { _id: result['_id'] };
                            const options = { expiresIn: '1d', issuer: 'soprano' };
                            const secret = process.env.JWT_SECRET;
                            const token = jwt.sign(payload, secret, options);
                            const userDetail = {
                                _id: result['_id'],
                                firstName: result.firstName,
                                lastName: result.lastName,
                                email: result.email,
                                password: result.password,
                                salt: result.salt,
                                token: token
                            };
                            return done(null, userDetail);
                        }
                        return done('Wrong Password', null);
                    }
                    return done("User not found", null);
                });
            },
            (userDetail, done) => {
                this._UserRepository.update(userDetail._id, userDetail, (error, result) => {
                    if (error) {
                        return done('Internal Server Error', null);
                    }
                    return done(null, userDetail.token);
                });
            }
        ], (err, result) => {
            if (err)
                return callback(err, null);
            return callback(null, result);
        });
    }
    retrieve(callback) {
        this._UserRepository.retrieve(callback);
    }
    findByToken(token, callback) {
        this._UserRepository.findByToken(token, callback);
    }
    logout(_id, callback) {
        this._UserRepository.logout(_id, callback);
    }
    delete() { }
    update(_id, item, callback) {
        this._UserRepository.update(_id, item, callback);
    }
    findById() { }
    saltHashPassword(password) {
        const salt = this.getSalt();
        return this.hashPasswordWithSalt(password, salt);
    }
    getSalt() {
        return crypto.randomBytes(this.saltLength).toString('Hex');
    }
    hashPasswordWithSalt(password, salt) {
        let hashedPassword = crypto.createHmac('sha512', salt);
        hashedPassword.update(password);
        hashedPassword = hashedPassword.digest('Hex');
        const encryptedValues = {
            salt: salt,
            password: hashedPassword
        };
        return encryptedValues;
    }
    changePassword(email, oldPassword, newPassword, callback) {
        this._UserRepository.findOne({ email }, (err, user) => {
            if (!user)
                return callback('We were unable to find a user with that email', null);
            if (err)
                return callback(err, null);
            // console.log("User Found ", user);
            const hashOldPassword = this.hashPasswordWithSalt(oldPassword, user.salt);
            const hashnewPassword = this.saltHashPassword(newPassword);
            console.log("user.password", user.password);
            console.log("user.salt", user.salt);
            console.log("hashOldPassword", hashOldPassword);
            console.log("hashnewPassword", hashnewPassword);
            if (hashOldPassword.password === user.password) {
                user.password = hashnewPassword.password;
                user.salt = hashnewPassword.salt;
                user.save((err) => {
                    if (err)
                        return callback('Error while updating records', null);
                    return callback(null, 'Successfully Updated the password');
                });
            }
        });
    }
}
Object.seal(UserBusiness);
module.exports = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map