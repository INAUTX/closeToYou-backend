// src/contacts/contacts.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('contacts')
@ApiBearerAuth() // Indica que esta ruta requiere autenticación
@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private contactsService: ContactsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo contacto' })
  @ApiResponse({ status: 201, description: 'El contacto ha sido creado con éxito.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  async create(@Body() createContactDto: CreateContactDto, @Req() req) {
    return this.contactsService.create(createContactDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los contactos' })
  @ApiResponse({ status: 200, description: 'Lista de contactos.' })
  async findAll(@Req() req) {
    return this.contactsService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un contacto por ID' })
  @ApiResponse({ status: 200, description: 'Detalles del contacto.' })
  @ApiResponse({ status: 404, description: 'Contacto no encontrado.' })
  async findOne(@Param('id') id: number, @Req() req) {
    return this.contactsService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un contacto' })
  @ApiResponse({ status: 200, description: 'El contacto ha sido actualizado con éxito.' })
  @ApiResponse({ status: 404, description: 'Contacto no encontrado.' })
  async update(
    @Param('id') id: number,
    @Body() updateContactDto: UpdateContactDto,
    @Req() req,
  ) {
    return this.contactsService.update(+id, updateContactDto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un contacto' })
  @ApiResponse({ status: 200, description: 'El contacto ha sido eliminado con éxito.' })
  @ApiResponse({ status: 404, description: 'Contacto no encontrado.' })
  async remove(@Param('id') id: number, @Req() req) {
    return this.contactsService.remove(+id, req.user);
  }
}
