import { InterceptableErrorStatusCodesEnum } from '@breef/shared/constants';

export const getIsInternalServerError = (statusCode: number | string) =>
    statusCode === InterceptableErrorStatusCodesEnum.ParsingError ||
    statusCode === InterceptableErrorStatusCodesEnum.CustomError ||
    String(statusCode).match(/\b5\d{2}\b/);
