import { Func } from '@nodeless/util';
import { Router, Request, Response } from 'express';

import { checkValidation } from '../../middlewares';
import { createErrorResponse, createSuccessResponse } from '../../messages';
import { body } from 'express-validator';

const addNewFunction = Router();

async function addNewFunctionController(req: Request, res: Response): Promise<void> {
  try {
    const { title, code } = req.body;

    const func = Func({ title, code });
    await func.save();

    createSuccessResponse(res, func.getShortResponse());
  } catch (err) {
    console.log(err);
    createErrorResponse(res, 400);
  }
}

addNewFunction.post(
  '/',
  [body('title').isString(), body('code').isString()],
  checkValidation,
  addNewFunctionController,
);
export { addNewFunction };
