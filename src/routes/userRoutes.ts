import express from 'express';
import { addUser, getUsers } from '../controllers/userController';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => ({
    folder: 'user-images',
    format: 'jpeg',
    public_id: file.originalname.split('.')[0],
  }),
});
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), addUser);
router.get('/', getUsers);

export default router;
