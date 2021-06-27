"use strict";
const PostBusiness = require("../../app/business/post/PostBusiness");
const utility_1 = require("../_helper/utility");
class PostController {
    /**
     * @description Api for creating new Post
     * @param request
     * @param response
     */
    create(request, response) {
        try {
            const post = request.body;
            post.user = request.user._id;
            const postBusiness = new PostBusiness();
            postBusiness.create(post, (error, result) => {
                if (error) {
                    console.log(error);
                    response.status(500).send(utility_1.default.generateResponse(404, error, false, null));
                }
                if (result) {
                    response.status(200).send(utility_1.default.generateResponse(200, `Created Successfully`, true, result));
                }
            });
        }
        catch (error) {
            console.log(error);
            response.send({ "Exception": error });
        }
    }
    /**
     * @api $BASE_URL/api/v1/allposts
     * @description Api for getting all posts
     * @param request
     * @param response
     */
    retrieve(request, response) {
        try {
            const user = request.user;
            const postBusiness = new PostBusiness();
            postBusiness.getPosts(user._id, (error, result) => {
                error ? response.status(404).send(utility_1.default.generateResponse(404, error, false, null)) : response.send(utility_1.default.generateResponse(200, 'All Posts', true, result));
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
    delete(request, response) {
        try {
            const id = request.params.id;
            const userId = request.user._id;
            const postBusiness = new PostBusiness();
            postBusiness.deletePost(id, userId, (error, result) => {
                error ? response.status(404).send(utility_1.default.generateResponse(404, error, false, null)) : response.send(utility_1.default.generateResponse(200, 'Post by id', true, result));
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
    findById(request, response) {
        try {
            const id = request.params.id;
            const postBusiness = new PostBusiness();
            postBusiness.findById(id, (error, result) => {
                error ? response.status(404).send(utility_1.default.generateResponse(404, error, false, null)) : response.send(utility_1.default.generateResponse(200, 'Post by id', true, result));
            });
        }
        catch (e) {
            response.send({ "exception": e });
        }
    }
    update(request, response) { }
}
module.exports = PostController;
//# sourceMappingURL=PostController.js.map