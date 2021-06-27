import mongoose = require('mongoose');

import DataAccess = require('../DataAccess');
import IPostModel = require('../../model/interfaces/PostModel');
let Mongoose = mongoose.Schema;

const PostSchema = new Mongoose({
    image: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Name is required',
    },
    title: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Title is required',
    },
    description: {
        type: String,
        trim: true,
        lowercase: true
    },
    user: {
        type: Mongoose.Types.ObjectId,
        ref: 'User',
        required: 'User is required',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

PostSchema.pre('save', function (next) {
    console.log('Pre Save Called');

    // This middleware will prevent `save()` from executing and go straight
    // to executing the error handling middleware
    // next(new Error('pre save error'));
    next();
});

PostSchema.post('save', function (doc, next) {
    console.log('Post Save Called');
    // If this hook is defined _before_ an error handler middleware, this will
    // skip all other non-error-handler post save hooks and execute the next
    // error handler middleware
    // next(new Error('post save error'));
    next();
});


const handleE11000 = (error, res, next) => {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('There was a duplicate key error'));
    } else {
        next();
    }
};

PostSchema.post('save', handleE11000);
PostSchema.post('update', handleE11000);
PostSchema.post('findOneAndUpdate', handleE11000);
PostSchema.post('insertMany', handleE11000);

let Post = DataAccess.mongooseConnection.model<IPostModel>("Post", PostSchema)


export = Post;