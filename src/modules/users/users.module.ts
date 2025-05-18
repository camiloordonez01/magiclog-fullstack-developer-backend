import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './domain/repositories';
import { UserController } from './interfaces/controllers/user.controller';
import { Models } from './infrastructure/models/typeorm';
import { UserTypeOrmRepository } from './infrastructure/repositories/typeorm';
import { LoginUseCase, RegisterUseCase, AllSellersUseCase } from './application/use-cases';
import { ConfigModule } from '../../config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([...Models])],
  controllers: [UserController],
  providers: [
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepository,
    },
    LoginUseCase,
    RegisterUseCase,
    AllSellersUseCase,
  ],
  exports: [UserRepository],
})
export class UsersModule {}
