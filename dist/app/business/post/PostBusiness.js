"use strict";
const PostRepository = require("../../repository/post/PostRepository");
class PostBusiness {
    constructor() {
        this._PostRepository = new PostRepository();
    }
    create(post, callback) {
        this._PostRepository.create(post, callback);
    }
    retrieve(callback) {
        this._PostRepository.retrieve(callback);
    }
    delete() { }
    update(_id, item, callback) {
    }
    findById(_id, callback) {
        this._PostRepository.findById(_id, callback);
    }
    getPosts(userId, callback) {
        this._PostRepository.getPosts(userId, callback);
    }
    deletePost(id, userId, callback) {
        this._PostRepository.deletePost(id, userId, callback);
    }
}
Object.seal(PostBusiness);
module.exports = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map