import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/rest-api-swagger') 

const ArticleSchema = new mongoose.Schema({
    title: String,
    author: String,
    bodyContent: String ,
    publicationDate: String,
    category: String
})

const ArticleModel = mongoose.model('articles', ArticleSchema)

export default ArticleModel;