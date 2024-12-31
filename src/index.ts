import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';

import cors from 'cors';
import userRoutes from './routes/userRoutes';
import './utils/scheduler';


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);

if (!process.env.MONGO_URI || !process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('Missing required environment variables');
  process.exit(1); // Exit the app
}

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
