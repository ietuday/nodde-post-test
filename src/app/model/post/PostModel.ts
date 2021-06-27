import IPostModel = require('../interfaces/PostModel');

class UserModel {
    private _postModel: IPostModel;

    constructor(private postModel: IPostModel) {
        this._postModel = postModel;
    }

    get image(): string {
        return this._postModel.image;
    }

    get title(): string {
        return this._postModel.title;
    }

    get description(): string {
        return this._postModel.description;
    }
    
    get user(): string {
        return this._postModel.user;
    }

    get createdAt(): Date {
        return this._postModel.createdAt;
    }

    get updatedAt(): Date {
        return this._postModel.updatedAt;
    }

}

Object.seal(UserModel);
export = UserModel;