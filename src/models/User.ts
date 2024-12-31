import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  dateOfBirth: Date;
  image: string;
  lastBirthdayEmailSent: Date
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  image: { type: String, required: true },
  lastBirthdayEmailSent: { type: Date, default: null },
});

export default mongoose.model<IUser>('User', UserSchema);
