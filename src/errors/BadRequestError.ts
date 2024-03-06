import BAD_REQUEST_CODE from '../middleware/errorsCode.js';

class BadRequestError extends Error {
  statusCode: {
    BAD_REQUEST_CODE: number;
  };
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = BAD_REQUEST_CODE;
  }
}
export default BadRequestError;
