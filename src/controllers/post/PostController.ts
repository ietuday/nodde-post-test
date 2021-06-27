import express = require('express');

import IBaseController = require('../interfaces/base');
import PostBusiness = require('../../app/business/post/PostBusiness')
import IPostModel = require('../../app/model/interfaces/PostModel');
import { IResponseFormat } from '../interfaces/common/ResponseFormat';
import Utility from '../_helper/utility';


class PostController implements IBaseController<PostBusiness>{
    private _responseFormat: IResponseFormat;

    /**
     * @description Api for creating new Post
     * @param request 
     * @param response 
     */
    create(request: express.Request, response: express.Response): void {
        try {

            const post: IPostModel = <IPostModel>request.body;
            post.user = request.user._id;
            const postBusiness = new PostBusiness();
            postBusiness.create(post, (error, result) => {
                if (error) {
                    console.log(error)
                    response.status(500).send(Utility.generateResponse(404, error, false, null))
                }
                if (result) {
                
                    response.status(200).send(Utility.generateResponse(200, `Created Successfully`, true, result));
                }
            })
        } catch (error) {
            console.log(error)
            response.send({ "Exception": error });
        }

    }


    /**
     * @api $BASE_URL/api/v1/allposts
     * @description Api for getting all posts
     * @param request 
     * @param response 
     */
    retrieve(request: express.Request, response: express.Response): void {
        try {
            const user = request.user;

            const postBusiness = new PostBusiness();
            postBusiness.getPosts(user._id, (error, result) => {
                error ? response.status(404).send(Utility.generateResponse(404, error, false, null)) : response.send(Utility.generateResponse(200, 'All Posts', true, result));

            });
        }

        catch (e) {
            response.send({ "exception": e });
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    delete(request: express.Request, response: express.Response): void {
        try {
            const id = request.params.id;
            const userId = request.user._id;

            const postBusiness = new PostBusiness();
            postBusiness.deletePost(id,userId, (error, result) => {
                error ? response.status(404).send(Utility.generateResponse(404, error, false, null)) : response.send(Utility.generateResponse(200, 'Post by id', true, result));

            });
        }

        catch (e) {
            response.send({ "exception": e });
        }
    }

    /**
     * 
     * @param request 
     * @param response 
     */
    findById(request: express.Request, response: express.Response): void { 
        try {
            const id = request.params.id;

            const postBusiness = new PostBusiness();
            postBusiness.findById(id, (error, result) => {
                error ? response.status(404).send(Utility.generateResponse(404, error, false, null)) : response.send(Utility.generateResponse(200, 'Post by id', true, result));

            });
        }

        catch (e) {
            response.send({ "exception": e });
        }
    }


    update(request: express.Request, response: express.Response): void { }
    

}
export = PostController;
