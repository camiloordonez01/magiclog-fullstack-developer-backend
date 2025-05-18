import { UserEntity } from '../entities';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
  abstract create(email: UserEntity): Promise<UserEntity>;
  abstract getAllSellers(): Promise<UserEntity[]>;
}