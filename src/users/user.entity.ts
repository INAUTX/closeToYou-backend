import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BeforeInsert,
  } from 'typeorm';
  import { Contact } from '../contacts/contact.entity';
  import * as bcrypt from 'bcrypt';
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    password: string;
  
    @OneToMany(() => Contact, (contact) => contact.user)
    contacts: Contact[];
  
    @BeforeInsert()
    async hashPassword() {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
  