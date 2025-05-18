import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
  Param,
  ParseIntPipe,
  Delete,
  Get,
  Req,
  Query,
} from '@nestjs/common';
import { CreateProductRequestDto, UpdateProductRequestDto } from '../dtos';
import {
  GetAllProductsUseCase,
  GetProductByIdUseCase,
  GetProductsUseCase,
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '../../application/use-cases';
import { AuthGuard } from '../../../../guards';
import { RequestWithUser } from '../../../../common/types/auth.types';

@Controller('products')
export class ProductController {
  constructor(
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly getProductUseCase: GetProductsUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Req() req: RequestWithUser) {
    return this.getProductUseCase.execute(req.user.id, req.user.role);
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  async getAllByFilter(
    @Query('name') name?: string,
    @Query('sku') sku?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sellerId') sellerId?: number,
  ) {
    return this.getAllProductsUseCase.execute(name, sku, minPrice, maxPrice, sellerId);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: RequestWithUser,
  ) {
    return this.getProductByIdUseCase.execute(id, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() dto: CreateProductRequestDto,
    @Req() req: RequestWithUser,
  ) {
    return this.createProductUseCase.execute(dto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Put('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Body() dto: UpdateProductRequestDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.updateProductUseCase.execute(id, dto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.deleteProductUseCase.execute(id);
  }
}
