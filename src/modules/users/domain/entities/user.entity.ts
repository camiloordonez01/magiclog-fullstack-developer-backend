export type UserRole = 'admin' | 'seller' | 'customer';

export class UserEntity {
  constructor(
    public readonly id: number | undefined,
    public readonly name: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole,
    public readonly activeRow: boolean = true,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}
}