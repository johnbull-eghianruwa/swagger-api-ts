import { Request, Response } from 'express';
import { User, readUsersFromFile, writeUsersToFile } from '../models/userModel';
import UserModel from '../dataAccessLayer/userDb';
import mongoose from 'mongoose';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        return res.json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Please try again', error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            const user = await UserModel.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.json(user);
        }

        return res.status(400).json({ message: 'User ID specified is invalid' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Please try again', error });
    }
};

export const createUser = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.body.email);

    const { email, firstName, lastName } = req.body;

    // Validate the input data
    if (typeof email !== 'string' || typeof firstName !== 'string' || typeof lastName !== 'string') {
        return res.status(400).json({ message: 'Invalid user data' });
    }

    try {
        const newUser = new UserModel({
            email,
            firstName,
            lastName
        });
        console.log(newUser);

        await newUser.save();
        res.status(201).json({ message: 'User successfully created', newUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user', error });
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
    
        if (mongoose.Types.ObjectId.isValid(userId)) {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                req.body,
                { new: true }
            )

            if (!updatedUser) {
                return res.status(404).json({ message: 'Unable to update a non existing user.' });
            }

            res.json({ message: 'Update successful', user: updatedUser });
        }

        return res.status(400).json({ message: 'Invalid user ID' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Please try again later', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(204).send();
    } catch (error) {
        // Handle any errors that occur during the deletion
        console.error(error);
        return res.status(500).json({ message: 'Please try again later', error });
    }
};