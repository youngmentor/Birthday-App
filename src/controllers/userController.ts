import { Request, Response } from 'express';
import User from '../models/User';

// Add a new user
export const addUser = async (req: Request, res: Response) => {
  try {
    const { name, email, dateOfBirth } = req.body;
    const imageUrl = req.file?.path;

    const newUser = new User({
      name,
      email,
      image: imageUrl,
      dateOfBirth
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log('Request body:', savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
