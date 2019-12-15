import { Func } from '@nodeless/util';
import { Router, Request, Response } from 'express';

import { checkValidation } from '../../middlewares';
import { createErrorResponse, createSuccessResponse } from '../../messages';
import { body, param } from 'express-validator';

const changeFunction = Router();

async function changeFunctionController(req: Request, res: Response): Promise<void> {
  try {
    const { id: _id } = req.params;

    const func = await Func.findOne({ _id });

    func.changeByObject(req.body);
    await func.save();

    createSuccessResponse(res, func.getShortResponse());
  } catch (err) {
    console.log(err);
    createErrorResponse(res, 400);
  }
}

changeFunction.put(
  '/:id',
  [
    param('id').isMongoId(),
    body('title')
      .isString()
      .optional(),
    body('code')
      .isString()
      .optional(),
  ],
  checkValidation,
  changeFunctionController,
);
export { changeFunction };
