export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;

    // Giúp instance của CustomError instanceof Error vẫn đúng
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// Hàm tiện lợi để throw error
export const throwError = (message: string, statusCode = 500): never => {
  throw new CustomError(message, statusCode);
};