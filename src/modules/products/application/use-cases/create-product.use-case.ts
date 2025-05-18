import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories';
import { ProductEntity } from '../../domain/entities';
import { BusinessError } from 'src/common';
import { CreateProductRequestDto } from '../../interfaces/dtos';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(
    data: CreateProductRequestDto,
    userId: number,
  ): Promise<ProductEntity> {
    const existingProductWithSku = await this.repository.findBySku(data.sku, userId);
    if (existingProductWithSku) {
      throw new BusinessError(
        'product.create.sku.exist',
        `El producto con SKU '${data.sku}' ya existe`,
      );
    }

    const existingProductWithName = await this.repository.findByName(data.name, userId);
    if (existingProductWithName) {
      throw new BusinessError(
        'product.create.name.exist',
        `El producto con nombre '${data.name}' ya existe`,
      );
    }

    const product = new ProductEntity(
      undefined,
      data.name,
      data.sku,
      data.amount,
      data.price,
      userId,
    );
    return this.repository.create(product);
  }
}
