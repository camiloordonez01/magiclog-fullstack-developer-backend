import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories';
import { ProductEntity } from '../../domain/entities/product.entity';

@Injectable()
export class GetProductsUseCase {
  constructor(
    private readonly repository: ProductRepository,
  ) {}

  async execute(userId: number, role: string): Promise<ProductEntity[]> {
    return this.repository.findAll(userId, role === 'admin');
  }
}