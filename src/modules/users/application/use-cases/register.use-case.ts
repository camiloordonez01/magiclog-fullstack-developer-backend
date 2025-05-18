import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../domain/entities';
import { LoginResponseDto, RegisterRequestDto } from '../../interfaces/dtos';
import { BusinessError, md5Hash } from '../../../../common';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: RegisterRequestDto): Promise<LoginResponseDto> {
    const existingUser = await this.userRepo.findByEmail(dto.email);
    if (existingUser) {
      throw new BusinessError('register', 'Al parecer ya existe un usuario con ese email');
    }

    const hashedPassword = md5Hash(dto.password);
    const userEntity = new UserEntity(undefined, dto.name, dto.lastName, dto.email, hashedPassword, dto.role);
    
    const user = await this.userRepo.create(userEntity);

    const payload = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return { token, role: user.role };
  }
}