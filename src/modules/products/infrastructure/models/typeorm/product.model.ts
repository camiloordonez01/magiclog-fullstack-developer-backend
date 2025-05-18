import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../../../common';

@Entity('products')
export class ProductModel extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 45, unique: true })
  sku: string;

  @Column()
  amount: number;

  @Column()
  price: number;
  
  @Column({ name: 'users_id' })
  userId: number;
}