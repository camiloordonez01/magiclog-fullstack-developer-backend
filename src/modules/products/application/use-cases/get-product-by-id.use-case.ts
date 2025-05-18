import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class GetProductByIdUseCase {
  constructor(
    private readonly repository: ProductRepository,
  ) {}

  async execute(productId: number, userId: number): Promise<ProductEntity | null> {
    return this.repository.findById(productId, userId);
  }
}