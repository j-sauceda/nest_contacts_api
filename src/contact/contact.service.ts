import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactDto } from './dto/contact.dto';

import { Contact } from './interfaces/contact.interface';

@Injectable()
export class ContactService {
  constructor(@InjectModel('Contact') private contactModel: Model<Contact>) {}

  async getUserContacts(user_id: string): Promise<Contact[]> {
    return await this.contactModel.find({ user: user_id });
  }

  async createContact(new_contact: ContactDto): Promise<Contact> {
    const contact = new this.contactModel(new_contact);
    return await contact.save();
  }

  async updateContact(id: string, updatedContact: Contact): Promise<Contact> {
    return await this.contactModel.findByIdAndUpdate(id, updatedContact, {
      new: true,
    });
  }

  async deleteContact(contact_id: string): Promise<Contact> {
    return await this.contactModel.findByIdAndRemove(contact_id);
  }
}
