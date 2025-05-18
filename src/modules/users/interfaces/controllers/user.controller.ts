import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto } from '../dtos';
import { LoginUseCase, RegisterUseCase, AllSellersUseCase } from '../../application/use-cases';
import { UserEntity } from '../../domain/entities';
import { RequestWithUser } from '../../../../common/types/auth.types';
import { AuthGuard } from '../../../../guards';

@Controller('users')
export class UserController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly allSellersUseCase: AllSellersUseCase,
  ) {}

  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() body: LoginRequestDto): Promise<LoginResponseDto> {
    return this.loginUseCase.execute(body.email, body.password);
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  register(@Body() body: RegisterRequestDto): Promise<LoginResponseDto> {
    return this.registerUseCase.execute(body);
  }

  @UseGuards(AuthGuard)
  @Get('sellers')
  sellers(@Req() req: RequestWithUser): Promise<Omit<UserEntity, 'password' | 'activeRow' | 'createdAt' | 'updatedAt'>[]> {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException()
    }

    return this.allSellersUseCase.execute();
  }
}
