// success.dto.ts
export class SuccessDto<T> {
  constructor(public message: string, public data?: T, public success: boolean = true) {}
}

// error.dto.ts
export class ErrorDto {
  constructor(public message: string, public statusCode: number, public error: string = 'Internal Server Error') {}
}
