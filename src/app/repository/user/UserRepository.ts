import IUserModel = require('../../model/interfaces/UserModel');
import UserSchema = require('../../dataAccess/schemas/UserSchema');
import RepositoryBase = require('../base');
import mongoose = require("mongoose");

class UserRepository extends RepositoryBase<IUserModel>{
    constructor() {
        super(UserSchema);
    }
    findUserByEmail(email: string, callback: (error: any, result: IUserModel) => void) {
        UserSchema.findOne({ email }, callback);
    }
    findByToken(token: string, callback: (error: any, result: IUserModel) => void) {
        UserSchema.findOne({ token }, callback);

    }
    logout(_id: mongoose.Types.ObjectId, callback: (error: any, result: IUserModel) => void) {
        UserSchema.update({ _id: _id }, { $unset: { token: 1 } }, callback);
    }
  
    findOne(item: Object, callback: (error: any, result: any) => void) {
        var query = UserSchema.findOne(item);
        query.exec((err, docs) => {
            if(!docs || docs.length === 0) return callback('No record found', null);
            if (err) return callback(err, null);
            return callback(null, docs);
        })
    }
}
Object.seal(UserRepository);
export = UserRepository;
    