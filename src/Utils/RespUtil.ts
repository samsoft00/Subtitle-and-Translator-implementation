import { Response } from 'express';

export default class RespUtil {
  statusCode: number;
  status: boolean;
  data: object;
  message: string;

  constructor() {
    this.statusCode = 200;
    this.status = false;
    this.data = {};
    this.message = '';
  }

  setSuccess(statusCode: number, message: string, data: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.status = true;
  }

  setError(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.status = false;
    return this;
  }

  send(res: Response) {
    const result = {
      status: this.status,
      message: this.message,
      data: this.data,
    };

    if (this.status === true) {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.status,
      message: this.message,
    });
  }
}
