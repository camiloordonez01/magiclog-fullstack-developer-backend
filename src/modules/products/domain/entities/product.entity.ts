export class ProductEntity {
  constructor(
    public readonly id: number | undefined,
    public readonly name: string,
    public readonly sku: string,
    public readonly amount: number,
    public readonly price: number,
    public readonly userId: number,
    public readonly activeRow: boolean = true,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}