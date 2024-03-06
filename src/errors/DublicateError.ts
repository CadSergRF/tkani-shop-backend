import DUPLICATE_KEY_ERROR from '../middleware/errorsCode.js';

class DublicateError extends Error {
  statusCode: {
    DUPLICATE_KEY_ERROR: number;
  };
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = DUPLICATE_KEY_ERROR;
  }
}
export default DublicateError;
