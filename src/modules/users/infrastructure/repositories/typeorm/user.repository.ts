import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../../models/typeorm';
import { UserEntity, UserRole } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { UserMapper } from '../../mappers/typeorm';

@Injectable()
export class UserTypeOrmRepository implements UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly repo: Repository<UserModel>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repo.findOne({ where: { email } });
    if (!user) return null;

    return UserMapper.toDomain(user);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const saved = this.repo.create(user);
    const newUser = await this.repo.save(saved);

    return UserMapper.toDomain(newUser);
  }

  async getAllSellers(): Promise<UserEntity[]> {
    const users = await this.repo.findBy({ role: 'seller' });

    return users.map((user) => UserMapper.toDomain(user));
  }
}
