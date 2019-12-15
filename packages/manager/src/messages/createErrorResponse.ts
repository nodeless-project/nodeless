import { Response } from 'express';
import { errorMessages } from './errors';
import { ResponseBody } from '../types';

export function createErrorResponseBody(errorCode: number, body = {}): ResponseBody {
    return {
        success: false,
        status: errorCode,
        msg: errorMessages[errorCode],
        error: true,
        ...body,
    };
}

export function createErrorResponse(res: Response, errorCode: number, body = {}): void {
    res && res.status && res.status(errorCode).json(createErrorResponseBody(errorCode, body));
}
