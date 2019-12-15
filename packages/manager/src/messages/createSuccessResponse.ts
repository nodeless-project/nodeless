import { Response } from 'express';

export function createSuccessResponse(res: Response, data = {}): void {
  res.status(200).json({
    success: true,
    data,
  });
}
