import { IsEmail, IsEnum, IsString } from 'class-validator';

export class RegisterRequestDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEnum(['admin', 'seller', 'customer'])
  role: 'admin' | 'seller' | 'customer';

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}