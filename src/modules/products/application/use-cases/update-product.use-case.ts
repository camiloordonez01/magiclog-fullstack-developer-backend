import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories';
import { ProductEntity } from '../../domain/entities/product.entity';
import { UpdateProductRequestDto } from '../../interfaces/dtos/update-product-request.dto';
import { BusinessError } from '../../../../common';

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(
    id: number,
    data: UpdateProductRequestDto,
  ): Promise<ProductEntity | null> {
    const existingProduct = await this.repository.findById(id);
    if (!existingProduct) {
      throw new BusinessError('product.update.noExist', 'Producto no encontrado');
    }

    const existingProductWithSku = await this.repository.findBySku(
      data.sku,
      existingProduct.userId,
    );
    if (existingProductWithSku && existingProductWithSku.id !== id) {
      throw new BusinessError(
        'product.update.sku.exist',
        `El producto con SKU '${data.sku}' ya existe`,
      );
    }

    const existingProductWithName = await this.repository.findByName(
      data.name,
      existingProduct.userId,
    );
    if (existingProductWithName && existingProductWithName.id !== id) {
      throw new BusinessError(
        'product.update.name.exist',
        `El producto con nombre '${data.name}' ya existe`,
      );
    }

    const updated = new ProductEntity(
      existingProduct.id,
      data.name ?? existingProduct.name,
      data.sku ?? existingProduct.sku,
      data.amount ?? existingProduct.amount,
      data.price ?? existingProduct.price,
      existingProduct.userId,
      existingProduct.activeRow,
      existingProduct.createdAt,
      new Date(),
    );

    return this.repository.update(updated);
  }
}
