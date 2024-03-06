import FORBIDDEN_CODE from '../middleware/errorsCode.js';

class ForbiddenError extends Error {
  statusCode: {
    FORBIDDEN_CODE: number;
  };
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = FORBIDDEN_CODE;
  }
}
module.exports = ForbiddenError;
