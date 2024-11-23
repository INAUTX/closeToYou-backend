import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Contact } from '../contacts/contact.entity';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config();

export const typeOrmConfig = () : TypeOrmModuleOptions => {

  const configService = new ConfigService();

  return {
   
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [User, Contact],
  synchronize: true,

  // host: process.env.DATABASE_HOST,
  // port: +process.env.DATABASE_PORT,
  // username: process.env.DATABASE_USERNAME,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_NAME,
  // entities: [User, Contact],
  // synchronize: true, 
  }
};
