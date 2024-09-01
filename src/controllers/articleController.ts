import { Request, Response } from 'express';
import { Article, readArticlesFromFile, writeArticlesToFile } from '../models/articleModel';
import ArticleModel from '../dataAccessLayer/articleDb';
import mongoose from 'mongoose';

export const getAllArticles = async (req: Request, res: Response) => {
    try {
        const articles = await ArticleModel.find();
        return res.json(articles);
    } catch (error) {
        res.status(500).json({ message: 'Please try again', error });
    }
};

export const getArticleById = async (req: Request, res: Response) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const article = await ArticleModel.findById(req.params.id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found' });
            }
            return res.json(article);
        }

        return res.status(400).json({ message: 'User ID specified is invalid' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Please try again', error });
    }
};

export const createArticle = async (req: Request, res: Response) => {
    try {
        console.log(req.body);
        const { title, author, bodyContent, publicationDate, category } = req.body;

        // Validate required fields
        if (
            typeof title !== 'string' ||
            typeof author !== 'string' ||
            typeof bodyContent !== 'string' ||
            typeof publicationDate !== 'string' ||
            typeof category !== 'string'
        ) {
            return res.status(400).json({ message: 'Invalid article data' });
        }

        const newArticle = new ArticleModel({
            title,
            author,
            bodyContent,
            publicationDate,
            category,
        });

        console.log(newArticle);

        await newArticle.save();
        return res.status(201).json({ message: 'Created successfully', newArticle });
    } catch (error) {
        console.error('Error creating article:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Failed to create article', error });
    }
};

export const updateArticle = async (req: Request, res: Response) => {
    try {
        const articleId = req.params.id;

        // Validate the article ID
        if (!mongoose.Types.ObjectId.isValid(articleId)) {
            return res.status(400).json({ message: 'Invalid article ID' });
        }

        // Attempt to find and update the article
        const updateArticle = await ArticleModel.findByIdAndUpdate(
            articleId,
            req.body,
            { new: true }
        );

        // Check if the article was found and updated
        if (!updateArticle) {
            return res.status(404).json({ message: 'Updating the existing article failed' });
        }

        // Successfully updated the article
        return res.json({ message: 'Update successful', article: updateArticle });

    } catch (error) {
        console.error('Error updating article:', error); // Log the error for debugging
        return res.status(500).json({ message: 'Please try again later', error });
    }
};

export const deleteArticle = async (req: Request, res: Response) => {
    const articleId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(articleId)) {
        return res.status(400).json({ message: 'Invalid article id ' });
    }

    try {
        const deleteArticle = await ArticleModel.findByIdAndDelete(articleId);
        if(!deleteArticle) {
            return res.status(404).json({message: 'Article not found'})
        }
        return res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Please try again later', error });
    }
};