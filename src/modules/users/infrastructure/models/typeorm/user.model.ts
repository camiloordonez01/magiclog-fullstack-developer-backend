import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../../../common';
import { UserRole } from '../../../domain/entities';

@Entity('users')
export class UserModel extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'seller', 'customer'],
    default: 'customer',
  })
  role: UserRole;
}
