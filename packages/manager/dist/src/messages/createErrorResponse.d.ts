import { Response } from 'express';
import { ResponseBody } from '../types';
export declare function createErrorResponseBody(errorCode: number, body?: {}): ResponseBody;
export declare function createErrorResponse(res: Response, errorCode: number, body?: {}): void;
