import { ResultStatus } from "@/types/enums/result-status";

export class Result<T> {
  data?: T | null = undefined;
  success?: boolean = false;
  statusCode: number = 0;
  response?: any | null = null;
  message: string = '';
  errors?: T | null = undefined;
  error: string = '';

  constructor(init?: Partial<Result<T>>) {
    Object.assign(this, init);
  }

  get resultStatus(): ResultStatus {
    switch (this.statusCode) {
      case 200: return ResultStatus.SUCCESS;
      case 204: return ResultStatus.NO_CONTENT;
      case 300: return ResultStatus.MULTIPLE_CHOICES;
      case 400: return ResultStatus.INVALID_REQUEST;
      case 401:
      case 403: return ResultStatus.UNAUTHORIZED;
      case 404: return ResultStatus.NOT_FOUND;
      case 408: return ResultStatus.REQUEST_TIMEOUT;
      case 500: return ResultStatus.SERVER_ERROR;
      default: return ResultStatus.NONE;
    }
  }
}


