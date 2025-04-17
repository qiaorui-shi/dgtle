export class ResultData {
  constructor (public code: number, public message: string, public data?: any) {
    this.code = code
    this.message = message
    this.data = data || null
  }

  static success (code: number = 200, message: string = 'success', data?: any): ResultData {
    return new ResultData(code, message, data)
  }
  static fail (code: number = 500, message: string = 'fail', data?: any): ResultData {
    return new ResultData(code, message, data)
  }
}
