export interface RequestWithUser extends Request {
  user: {
    id: number;
    name: string;
    lastName: string;
    role: string;
    email: string;
  };
}