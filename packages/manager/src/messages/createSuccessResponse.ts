import { Response } from 'express';
import { ResponseBody } from '../types';

export function createSuccessResponse(res: Response, data = {}): ResponseBody {
    res.status(200).json({
        success: true,
        data,
    });
}
