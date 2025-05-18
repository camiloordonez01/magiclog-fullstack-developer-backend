import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BusinessError, md5Hash } from '../../../../common';
import { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.activeRow) {
      throw new BusinessError('login', 'Credenciales inválidas');
    }

    const hashed = md5Hash(password);
    if (user.password !== hashed) {
      throw new BusinessError('login', 'Credenciales inválidas');
    }

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
