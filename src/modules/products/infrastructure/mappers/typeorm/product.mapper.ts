import { ProductModel } from '../../models/typeorm';
import { ProductEntity } from '../../../domain/entities';

export class ProductMapper {
  static toDomain(model: ProductModel): ProductEntity {
    return new ProductEntity(
      model.id,
      model.name,
      model.sku,
      model.amount,
      model.price,
      model.userId,
      model.activeRow,
      model.createdAt,
      model.updatedAt,
    );
  }

  static toModel(entity: ProductEntity): ProductModel {
    const model = new ProductModel();
    model.id = entity.id ?? model.id;
    model.name = entity.name;
    model.sku = entity.sku;
    model.amount = entity.amount;
    model.price = entity.price;
    model.userId = entity.userId;
    model.activeRow = entity.activeRow;
    model.createdAt = entity.createdAt;
    model.updatedAt = entity.updatedAt;
    return model;
  }
}