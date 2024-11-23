// src/contacts/dto/create-contact.dto.ts

import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ description: 'Nombre del contacto' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Número de teléfono del contacto' })
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Correo electrónico del contacto', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'URL de la foto del contacto', required: false })
  @IsOptional()
  photo?: string;

  @ApiProperty({ description: 'Latitud de la ubicación del contacto', required: false })
  @IsOptional()
  latitude?: number;

  @ApiProperty({ description: 'Longitud de la ubicación del contacto', required: false })
  @IsOptional()
  longitude?: number;
}
