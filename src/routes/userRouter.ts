import express from 'express';
import { getAllUsers, getUserById, updateUser, createUser, deleteUser } from '../controllers/userController';


const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - users
 *     summary: Returns a list of users or a specific user by query
 *     responses:
 *       200:
 *         description: A successful response
 */
userRouter.get('/', getAllUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - users
 *     summary: Returns user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A successful response
 */
userRouter.get('/:id', getUserById);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - users
 *     summary: Add a new users store
 *     operationId: addUser
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     requestBody:
 *         description: users object that needs to be added to the store
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               required:
 *                 - email
 *                 - firstName
 *                 - lastName
 *               properties:
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string 
 *     responses:
 *       "201":
 *         description: Created
 */
userRouter.post('/', createUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - users
 *     summary: update user by ID
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *         description: users object that needs to be added to the store
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               required:
 *                 - email
 *                 - firstName
 *                 - lastName
 *               properties:
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string 
 *     responses:
 *       200:
 *         description: A successful response
 */
userRouter.put('/:id', updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - users
 *     summary: delete user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: A successful response
 */
userRouter.delete('/:id', deleteUser); 

export default userRouter;