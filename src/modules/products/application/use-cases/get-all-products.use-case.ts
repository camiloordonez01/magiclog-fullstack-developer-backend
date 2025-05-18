import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class GetAllProductsUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(
    name?: string,
    sku?: string,
    minPrice?: number,
    maxPrice?: number,
    sellerId?: number,
  ): Promise<ProductEntity[]> {
    return this.repository.findAllByFilter(name, sku, minPrice, maxPrice, sellerId);
  }
}
