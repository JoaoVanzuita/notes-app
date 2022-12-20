export class ResponseError {
  public readonly message: string
  public readonly statusCode: number

  constructor(messsage: string, statusCode: number) {
    this.message = messsage
    this.statusCode = statusCode
  }
}