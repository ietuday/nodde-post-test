import IPostModel = require('../../model/interfaces/PostModel');
import PostSchema = require('../../dataAccess/schemas/PostSchema');
import RepositoryBase = require('../base');

class PostRepository extends RepositoryBase<IPostModel>{
    constructor() {
        super(PostSchema);
    }


    getPosts(userid: string, callback: (error: any, result: any) => void) {
        PostSchema.find({"user": userid}, (err, res) => {
            err ? callback(err, null) : callback(null, res)
        })
    }

    deletePost(id: string, userid: string, callback: (error: any, result: any) => void) {
        PostSchema.findOne({"_id": id, "user": userid}, (err, res) => {
            err ? callback(err, null) : null
            if(res){
                PostSchema.findOneAndRemove({"_id": id}, (errr, resp) => {
                    errr ? callback(errr, null) : callback(null, resp)
                })
            }else{
                callback(null, "Not Authorize to remove this post")
            }
        })
    }

    

}
Object.seal(PostRepository);
export = PostRepository;
    