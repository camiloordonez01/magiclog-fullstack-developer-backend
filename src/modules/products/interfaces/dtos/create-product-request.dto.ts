import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateProductRequestDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsInt()
  @Min(0)
  amount: number;

  @IsInt()
  @Min(0)
  price: number;
}