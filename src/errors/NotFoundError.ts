import NOT_FOUND_CODE from '../middleware/errorsCode.js';

class NotFoundError extends Error {
  statusCode: {
    NOT_FOUND_CODE: number;
  };
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = NOT_FOUND_CODE;
  }
}
export default NotFoundError;
