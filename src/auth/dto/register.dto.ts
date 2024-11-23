import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Nombre del usuario' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Correo electrónico del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Contraseña del usuario', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
