"use strict";
const UserSchema = require("../../dataAccess/schemas/UserSchema");
const RepositoryBase = require("../base");
class UserRepository extends RepositoryBase {
    constructor() {
        super(UserSchema);
    }
    findUserByEmail(email, callback) {
        UserSchema.findOne({ email }, callback);
    }
    findByToken(token, callback) {
        UserSchema.findOne({ token }, callback);
    }
    logout(_id, callback) {
        UserSchema.update({ _id: _id }, { $unset: { token: 1 } }, callback);
    }
    findOne(item, callback) {
        var query = UserSchema.findOne(item);
        query.exec((err, docs) => {
            if (!docs || docs.length === 0)
                return callback('No record found', null);
            if (err)
                return callback(err, null);
            return callback(null, docs);
        });
    }
}
Object.seal(UserRepository);
module.exports = UserRepository;
//# sourceMappingURL=UserRepository.js.map