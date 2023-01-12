import { Schema } from 'mongoose';

export const ContactSchema = new Schema({
  user: String, // Schema.Types.ObjectId,
  name: String,
  email: String,
  phone: String,
  relation: String,
});
