export class BusinessError extends Error {
  public type: string;
  constructor(type: string, message: string) {
    super(message);
    this.type = type;
  }
}
