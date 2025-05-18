import { IsString, IsInt, Min } from 'class-validator';

export class UpdateProductRequestDto {
  @IsString()
  name: string;

  @IsString()
  sku: string;

  @IsInt()
  @Min(0)
  amount: number;

  @IsInt()
  @Min(0)
  price: number;
}