import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Check
} from 'typeorm';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager'
}

@Entity()
@Check(`"role" in ('user', 'admin', 'manager')`)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ length: 100, nullable: false })
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER, nullable: false })
  role: Role;

  @Column()
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updated_at: Date;
}
