
import mongoose = require('mongoose');

interface PostModel extends mongoose.Document {
    title?: string;
    description?: string;
    image?: string;
    user?: string;
    createdAt?: Date;
    updatedAt?: Date;

}

export = PostModel;