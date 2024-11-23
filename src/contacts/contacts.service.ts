import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Contact } from './contact.entity';
import { User } from '../users/user.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}

  async create(
    createContactDto: CreateContactDto,
    user: User,
  ): Promise<Contact> {
    const contact = this.contactsRepository.create({
      ...createContactDto,
      user,
    });
    return this.contactsRepository.save(contact);
  }

  async findAll(user: User): Promise<Contact[]> {
    return this.contactsRepository.find({ where: { user } });
  }

  async findOne(id: number, user: User): Promise<Contact> {
    const contact = await this.contactsRepository.findOne({
      where: { id, user },
    });
    if (!contact) {
      throw new NotFoundException('Contacto no encontrado');
    }
    return contact;
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
    user: User,
  ): Promise<Contact> {
    const contact = await this.findOne(id, user);
    Object.assign(contact, updateContactDto);
    return this.contactsRepository.save(contact);
  }

  async remove(id: number, user: User): Promise<void> {
    const contact = await this.findOne(id, user);
    await this.contactsRepository.remove(contact);
  }
}
