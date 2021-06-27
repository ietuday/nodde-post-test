import BaseBusiness = require('./base');
import IPostModel = require('./../../model/interfaces/PostModel');

interface PostBusiness extends BaseBusiness<IPostModel> {

}
export = PostBusiness;