import express from 'express';
import { getAllArticles, getArticleById, updateArticle, createArticle, deleteArticle } from '../controllers/articleController';

const articlesRouter = express.Router();

/**
 * @swagger
 * /articles:
 *   get:
 *     tags:
 *       - articles
 *     summary: Returns a list of article or a specific article by query
 *     responses:
 *       200:
 *         description: A successful response
 */
articlesRouter.get('/', getAllArticles);

/**
 * @swagger
 * /articles/{id}:
 *   get:
 *     tags:
 *       - articles
 *     summary: Returns article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the article to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response
 */
articlesRouter.get('/:id', getArticleById);

/**
 * @swagger
 * /articles:
 *   post:
 *     tags:
 *       - articles
 *     summary: Add a new article store
 *     operationId: addArticle
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *         description: articles object that needs to be added to the store
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               required:
 *                 - title
 *                 - author
 *                 - bodyContent
 *                 - publicationDate
 *                 - category
 *               properties:
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 bodyContent:
 *                   type: string 
 *                 publicationDate:
 *                   type: string 
 *                 category:
 *                   type: string 
 *     responses:
 *       "201":
 *         description: Created
 */
articlesRouter.post('/', createArticle);

/**
 * @swagger
 * /articles/{id}:
 *   put:
 *     tags:
 *       - articles
 *     summary: Update article by ID
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the article to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Article object that needs to be updated in the store
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - bodyContent
 *               - publicationDate
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               bodyContent:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: A successful response
 */
articlesRouter.put('/:id', updateArticle);

/**
 * @swagger
 * /articles/{id}:
 *   delete:
 *     tags:
 *       - articles
 *     summary: delete article by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the article to be delete
 *         required: true
 *         schema:
 *         type: string
 *     responses:
 *       200:
 *         description: A successful response
 */

articlesRouter.delete('/:id', deleteArticle)

export default articlesRouter;
