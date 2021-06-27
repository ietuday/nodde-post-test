const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const async = require('async');;

import UserRepository = require('../../repository/user/UserRepository');
import IUserBusiness = require('../interfaces/UserBusiness');
import IUserModel = require('../../model/interfaces/UserModel');

interface Ihash {
    password: string;
    salt: string;
}

class UserBusiness implements IUserBusiness {
    private _UserRepository: UserRepository;
    saltLength: number = 10;
   

    constructor() {
        this._UserRepository = new UserRepository();
    }

    create(user: IUserModel, callback: (error: any, result: any) => void) {
        const hash = this.saltHashPassword(user.password);
        user.password = hash.password;
        user.salt = hash.salt;
        this._UserRepository.create(user, callback);
    }

    login(email: string, password: string, callback: (error: any, result: any) => void) {
        async.waterfall([
            (done) => {
                this._UserRepository.findUserByEmail(email, (error, result) => {
                    if (result) {
                        if (!result.isVerified) {
                            return done('Your account has not been verified', null)
                        }
                        const userPassword: Ihash = this.hashPasswordWithSalt(password, result.salt);
                        if (result.password === userPassword.password) {
                            const payload = { _id: result['_id'] };
                            const options = { expiresIn: '1d', issuer: 'soprano' };
                            const secret = process.env.JWT_SECRET;
                            const token = jwt.sign(payload, secret, options);
                            const userDetail:any = {
                                _id: result['_id'],
                                firstName: result.firstName,
                                lastName: result.lastName,
                                email: result.email,
                                password: result.password,
                                salt: result.salt,
                                token: token
                            }
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
                })
            }
        ], (err, result) => {
            if (err) return callback(err, null);
            return callback(null, result);
        });
    }

    retrieve(callback: (error: any, result: any) => void) {
        this._UserRepository.retrieve(callback);
    }

    findByToken(token: string, callback: (error: any, result: any) => void) {
        this._UserRepository.findByToken(token, callback);
    }

    logout(_id: string, callback: (error: any, result: any) => void) {
        this._UserRepository.logout(_id, callback);
    }

    delete() { }

    update(_id: string, item: IUserModel, callback: (error: any, result: any) => void) {


        this._UserRepository.update(_id, item, callback);

    }
  

    findById() { }

    saltHashPassword(password: string): Ihash {
        const salt: string = this.getSalt();
        return this.hashPasswordWithSalt(password, salt);
    }

    getSalt(): string {
        return crypto.randomBytes(this.saltLength).toString('Hex');
    }

    hashPasswordWithSalt(password: string, salt: string): Ihash {

        let hashedPassword = crypto.createHmac('sha512', salt);
        hashedPassword.update(password);
        hashedPassword = hashedPassword.digest('Hex');
        const encryptedValues: Ihash = {
            salt: salt,
            password: hashedPassword
        };
        return encryptedValues;
    }

    changePassword(email: string, oldPassword: string, newPassword: string, callback: (error: any, result: any) => void) {
        this._UserRepository.findOne({email}, (err, user) => {
            if (!user) return callback('We were unable to find a user with that email', null);
            if(err) return callback(err, null);
            // console.log("User Found ", user);
            const hashOldPassword: Ihash = this.hashPasswordWithSalt(oldPassword, user.salt);
            const hashnewPassword = this.saltHashPassword(newPassword);
            console.log("user.password", user.password);
            console.log("user.salt", user.salt);
            console.log("hashOldPassword",hashOldPassword);
            console.log("hashnewPassword",hashnewPassword);
            if(hashOldPassword.password === user.password){
                user.password = hashnewPassword.password;
                user.salt = hashnewPassword.salt;
                user.save((err) => {
                    if(err) return callback('Error while updating records', null);
                    
                    return callback(null, 'Successfully Updated the password')
                })
            }
            
        })
    }
}

Object.seal(UserBusiness);
export = UserBusiness;
