import { ProductEntity } from '../entities';

export abstract class ProductRepository {
  abstract create(product: ProductEntity): Promise<ProductEntity>;
  abstract update(product: ProductEntity): Promise<ProductEntity>;
  abstract delete(id: number): Promise<void>;
  abstract findById(
    id: number,
    userId?: number,
    isAdmin?: boolean,
  ): Promise<ProductEntity | null>;
  abstract findBySku(
    sku: string,
    userId: number,
  ): Promise<ProductEntity | null>;
  abstract findByName(
    name: string,
    userId: number,
  ): Promise<ProductEntity | null>;
  abstract findAll(
    userId?: number,
    isAdmin?: boolean,
  ): Promise<ProductEntity[]>;
  abstract findAllByFilter(
    name?: string,
    sku?: string,
    minPrice?: number,
    maxPrice?: number,
    userId?: number
  ): Promise<ProductEntity[]>;
}
