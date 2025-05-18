import { UserEntity } from '../../../domain/entities';
import { UserModel } from '../../models/typeorm';

export class UserMapper {
  static toDomain(model: UserModel): UserEntity {
    return new UserEntity(
      model.id,
      model.name,
      model.lastName,
      model.email,
      model.password,
      model.role,
      model.activeRow,
      model.createdAt,
      model.updatedAt,
    );
  }

  static toModel(entity: UserEntity): UserModel {
    const userModel = new UserModel();
    userModel.id = entity.id ?? userModel.id;
    userModel.name = entity.name;
    userModel.lastName = entity.lastName;
    userModel.email = entity.email;
    userModel.password = entity.password;
    userModel.role = entity.role;
    userModel.activeRow = entity.activeRow;
    userModel.createdAt = entity.createdAt;
    userModel.updatedAt = entity.updatedAt;
    return userModel;
  }
}