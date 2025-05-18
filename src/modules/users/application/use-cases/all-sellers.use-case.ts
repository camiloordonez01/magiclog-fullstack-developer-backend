import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories';
import { BusinessError } from 'src/common';
import { UserEntity } from '../../domain/entities';

@Injectable()
export class AllSellersUseCase {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<Omit<UserEntity, 'password' | 'activeRow' | 'createdAt' | 'updatedAt'>[]> {
    const users = await this.repository.getAllSellers();
    return users.map(({ password, activeRow, createdAt, updatedAt, ...user }) => ({ ...user }));
  }
}
