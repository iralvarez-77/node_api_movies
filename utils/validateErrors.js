export class ClientError extends Error {
  constructor(message, status = 400) {
    super(message)
    this.statusCode = status
  }
}

export class AuthErrors extends Error {
  constructor(message,status) {
    super(message)
    this.statusCode = status
  }
}