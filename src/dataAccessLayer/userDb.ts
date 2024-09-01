import express from 'express';
import mongoose  from 'mongoose';

mongoose.connect('mongodb://localhost:27017/rest-api-swagger')

const UserSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel;