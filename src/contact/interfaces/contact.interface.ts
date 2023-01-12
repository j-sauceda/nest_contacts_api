import { Document } from 'mongoose';

export interface Contact extends Document {
  id?: string;
  user: string;
  name: string;
  email?: string;
  phone?: string;
  relation: string;
}
