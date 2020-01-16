import { Func } from '@nodeless/util';
import { Router, Request, Response } from 'express';

import { checkValidation } from '../../middlewares';
import { createErrorResponse, createSuccessResponse } from '../../messages';
import { param } from 'express-validator';

const callFunction = Router();

async function callFunctionController(req: Request, res: Response): Promise<void> {
  try {
    const { id: _id } = req.params;

    const func = Func.findOne({ _id });

    if (!func) {
      createErrorResponse(res, 400);
      return;
    }

    req.nodless.call(func._id, req.body.params || {});
    createSuccessResponse(res, func.getShortResponse());
  } catch (err) {
    console.log(err);
    createErrorResponse(res, 400);
  }
}

callFunction.post('/:id', [param('id').isMongoId()], checkValidation, callFunctionController);
export { callFunction };
