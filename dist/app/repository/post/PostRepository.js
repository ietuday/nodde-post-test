"use strict";
const PostSchema = require("../../dataAccess/schemas/PostSchema");
const RepositoryBase = require("../base");
class PostRepository extends RepositoryBase {
    constructor() {
        super(PostSchema);
    }
    getPosts(userid, callback) {
        PostSchema.find({ "user": userid }, (err, res) => {
            err ? callback(err, null) : callback(null, res);
        });
    }
    deletePost(id, userid, callback) {
        PostSchema.findOne({ "_id": id, "user": userid }, (err, res) => {
            err ? callback(err, null) : null;
            if (res) {
                PostSchema.findOneAndRemove({ "_id": id }, (errr, resp) => {
                    errr ? callback(errr, null) : callback(null, resp);
                });
            }
            else {
                callback(null, "Not Authorize to remove this post");
            }
        });
    }
}
Object.seal(PostRepository);
module.exports = PostRepository;
//# sourceMappingURL=PostRepository.js.map