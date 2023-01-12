import {
  Controller,
  Body,
  Param,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Contact } from './interfaces/contact.interface';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('contacts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('contacts')
export class ContactController {
  constructor(private contactService: ContactService) {}

  // Get all contacts for a given user
  @ApiResponse({
    status: 200,
    description: 'All contacts of the user with given ID',
    type: [ContactDto],
  })
  @Get(':user_id')
  getUserContacts(@Param('user_id') user_id: string): Promise<Contact[]> {
    return this.contactService.getUserContacts(user_id);
  }

  // Create a new contact
  @ApiResponse({
    status: 201,
    description:
      'Creates a new contact of the user with random ID. No contact _id is expected in the Request Body',
    type: ContactDto,
  })
  @Post()
  createContact(@Body() newContact: ContactDto): Promise<Contact> {
    return this.contactService.createContact(newContact);
  }

  // Update a contact
  @ApiBody({ type: ContactDto })
  @ApiResponse({
    status: 200,
    description:
      'Updates a contact with given ID parameter. No contact _id is expected in the Request Body',
    type: ContactDto,
  })
  @Put(':id')
  updateContact(
    @Body() contact: Contact,
    @Param('id') id: string,
  ): Promise<Contact> {
    return this.contactService.updateContact(id, contact);
  }

  // Delete a contact
  @ApiResponse({
    status: 200,
    description: 'Deletes a contact with given ID parameter',
    type: ContactDto,
  })
  @Delete(':id')
  deleteContact(@Param('id') id: string): Promise<Contact> {
    return this.contactService.deleteContact(id);
  }
}
