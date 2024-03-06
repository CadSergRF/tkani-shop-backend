import AUTH_ERROR_CODE from '../middleware/errorsCode.js';

class AuthError extends Error {
  statusCode: {
    AUTH_ERROR_CODE: number;
  };
  constructor(message: string | undefined) {
    super(message);
    this.statusCode = AUTH_ERROR_CODE;
  }
}

export default AuthError;
