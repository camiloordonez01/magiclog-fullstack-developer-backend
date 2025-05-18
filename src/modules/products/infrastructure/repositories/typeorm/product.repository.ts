import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductEntity } from '../../../domain/entities';
import { ProductRepository } from '../../../domain/repositories';
import { ProductModel } from '../../models/typeorm';
import { ProductMapper } from '../../mappers/typeorm';

@Injectable()
export class ProductTypeOrmRepository implements ProductRepository {
  constructor(
    @InjectRepository(ProductModel)
    private readonly repo: Repository<ProductModel>,
  ) {}

  async create(product: ProductEntity): Promise<ProductEntity> {
    const saved = await this.repo.save(ProductMapper.toModel(product));
    return ProductMapper.toDomain(saved);
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    const model = ProductMapper.toModel(product);
    await this.repo.update(model.id, model);
    const updated = await this.repo.findOneBy({ id: product.id });
    if (!updated) throw new Error('Product not found after update');
    return ProductMapper.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: number, userId?: number): Promise<ProductEntity | null> {
    const model = await this.repo.findOneBy({ id, userId });
    return model ? ProductMapper.toDomain(model) : null;
  }

  async findBySku(sku: string, userId: number): Promise<ProductEntity | null> {
    const model = await this.repo.findOneBy({ sku, userId });
    return model ? ProductMapper.toDomain(model) : null;
  }

  async findByName(
    name: string,
    userId: number,
  ): Promise<ProductEntity | null> {
    const model = await this.repo.findOneBy({ name, userId });
    return model ? ProductMapper.toDomain(model) : null;
  }

  async findAll(userId?: number, isAdmin?: boolean): Promise<ProductEntity[]> {
    const query = this.repo.createQueryBuilder('product');

    if (!isAdmin && userId) {
      query.where('product.userId = :userId', { userId });
    }
    const results = await query.getMany();
    return results.map(ProductMapper.toDomain);
  }

  async findAllByFilter(
    name?: string,
    sku?: string,
    minPrice?: number,
    maxPrice?: number,
    userId?: number
  ): Promise<ProductEntity[]> {
    const query = this.repo.createQueryBuilder('product');

    if (name) {
      query.andWhere('LOWER(product.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
    }

    if (sku) {
      query.andWhere('product.sku LIKE :sku', { sku: `%${sku}%` });
    }

    if (minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    if (userId) {
      query.andWhere('product.users_id = :userId', { userId });
    }

    const results = await query.getMany();
    return results.map(ProductMapper.toDomain);
  }
}
