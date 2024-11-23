import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { User } from '../users/user.entity';
  
  @Entity()
  export class Contact {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    phone: string;
  
    @Column()
    email: string;
  
    @Column({ nullable: true })
    photo: string;
  
    @Column('decimal', { nullable: true })
    latitude: number;
  
    @Column('decimal', { nullable: true })
    longitude: number;
  
    @ManyToOne(() => User, (user) => user.contacts)
    user: User;
  }
  