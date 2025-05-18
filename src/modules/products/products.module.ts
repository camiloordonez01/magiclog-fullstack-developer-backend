import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './domain/repositories';
import { ProductController } from './interfaces/controllers/product.controller';
import { Models } from './infrastructure/models/typeorm';
import { ProductTypeOrmRepository } from './infrastructure/repositories/typeorm';
import {
  GetProductsUseCase,
  GetProductByIdUseCase,
  CreateProductUseCase,
  GetAllProductsUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from './application/use-cases';
import { ConfigModule } from '../../config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([...Models])],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductTypeOrmRepository,
    },
    GetProductsUseCase,
    GetProductByIdUseCase,
    CreateProductUseCase,
    GetAllProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
  exports: [ProductRepository],
})
export class ProductsModule {}
