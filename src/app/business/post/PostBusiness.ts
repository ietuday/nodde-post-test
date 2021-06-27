

import PostRepository = require('../../repository/post/PostRepository');
import IPostBusiness = require('../interfaces/PostBusiness');
import IPostModel = require('../../model/interfaces/PostModel');


class PostBusiness implements IPostBusiness {
    private _PostRepository: PostRepository;

    constructor() {
        this._PostRepository = new PostRepository();
    }

    create(post: IPostModel, callback: (error: any, result: any) => void) {
        this._PostRepository.create(post, callback);
    }

    retrieve(callback: (error: any, result: any) => void) {
        this._PostRepository.retrieve(callback);
    }

    delete() { }

    update(_id: string, item: IPostModel, callback: (error: any, result: any) => void) {

    }
  

    findById(_id: string, callback: (error: any, result: any) => void) {
        this._PostRepository.findById(_id, callback);
    }

    getPosts(userId: string, callback: (error: any, result: any) => void) {
        this._PostRepository.getPosts(userId, callback)
    }

    deletePost(id: string, userId: string, callback: (error: any, result: any) => void) {
        this._PostRepository.deletePost(id, userId, callback)
    }

   
}

Object.seal(PostBusiness);
export = PostBusiness;
