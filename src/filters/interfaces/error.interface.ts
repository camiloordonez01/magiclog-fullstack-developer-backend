export interface ErrorResponse {
  status: number;
  message: 'Error';
  type: string;
  timestamp: string;
  data: string | object;
}

export interface ErrorCreate {
  exception: Error;
  request: Request;
  response: Response;
}
