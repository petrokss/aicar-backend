import { Entity, Column, BeforeInsert } from 'typeorm';
import bcrypt from 'bcrypt';
import Model from './Model';

export enum Role {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
  MANAGER = 'ROLE_MANAGER'
}

@Entity()
export class User extends Model {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({ default: Role.USER })
  role: Role;

  @Column({ nullable: true })
  description: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
