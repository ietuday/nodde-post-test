import mongoose = require('mongoose');

interface UserModel extends mongoose.Document {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    token?: string;
    salt?: string;
    reset_password_token?: string;
    reset_password_expires?: number;
    createdAt?: Date; 
    updatedAt?: Date;
    lastLogin?: Date;
    isVerified?: Boolean;
    verificationToken?: string
}

export = UserModel;