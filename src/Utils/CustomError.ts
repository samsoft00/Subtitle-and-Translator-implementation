/**
 * Class handle custom error
 */

class CustomError extends Error {
  statusCode: number;
  date: Date;

  constructor(statusCode = 400, message = 'Error occur') {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = 'CustomError';
    this.message = message;
    this.statusCode = statusCode;
    this.date = new Date();
  }
}

export default CustomError;
