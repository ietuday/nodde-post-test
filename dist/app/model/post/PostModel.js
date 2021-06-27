"use strict";
class UserModel {
    constructor(postModel) {
        this.postModel = postModel;
        this._postModel = postModel;
    }
    get image() {
        return this._postModel.image;
    }
    get title() {
        return this._postModel.title;
    }
    get description() {
        return this._postModel.description;
    }
    get user() {
        return this._postModel.user;
    }
    get createdAt() {
        return this._postModel.createdAt;
    }
    get updatedAt() {
        return this._postModel.updatedAt;
    }
}
Object.seal(UserModel);
module.exports = UserModel;
//# sourceMappingURL=PostModel.js.map