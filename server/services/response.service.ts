export class ResponseService {
  constructor() {}

  static successRes<T>(data: T) {
    return {
      code: 200,
      message: 'Success',
      data: data
    }
  }
  static badRes(message: string) {
    return {
      code: 400,
      message: message,
    }
  }
  static internalServErr() {
    return {
      code: 500,
      message: 'Internal Server Error'
    }
  }
}
