"use strict";
const mongoose = require("mongoose");
const DataAccess = require("../DataAccess");
let Mongoose = mongoose.Schema;
const UserSchema = new Mongoose({
    name: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Name is required',
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
        lowercase: true,
        required: 'Password is required',
    },
    image: {
        type: String,
        trim: true,
        lowercase: true
    },
    token: {
        type: String,
    },
    salt: {
        type: String
    },
    reset_password_token: {
        type: String
    },
    reset_password_expires: {
        type: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    lastLogin: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: true
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });
UserSchema.pre('save', function (next) {
    console.log('Pre Save Called');
    // This middleware will prevent `save()` from executing and go straight
    // to executing the error handling middleware
    // next(new Error('pre save error'));
    next();
});
UserSchema.post('save', function (doc, next) {
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
    }
    else {
        next();
    }
};
UserSchema.post('save', handleE11000);
UserSchema.post('update', handleE11000);
UserSchema.post('findOneAndUpdate', handleE11000);
UserSchema.post('insertMany', handleE11000);
let User = DataAccess.mongooseConnection.model("User", UserSchema);
module.exports = User;
//# sourceMappingURL=UserSchema.js.map