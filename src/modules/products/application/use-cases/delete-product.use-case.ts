import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { BusinessError } from 'src/common';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly repository: ProductRepository) {}

  async execute(id: number): Promise<void> {
    const existingProduct = await this.repository.findById(id);
    if (!existingProduct) {
      throw new BusinessError(
        'product.delete.noExist',
        'Producto no encontrado',
      );
    }
    await this.repository.delete(id);
  }
}
