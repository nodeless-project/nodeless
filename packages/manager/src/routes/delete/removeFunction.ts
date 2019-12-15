import { Func } from '@nodeless/util';
import { Router, Request, Response } from 'express';

import { checkValidation } from '../../middlewares';
import { createErrorResponse, createSuccessResponse } from '../../messages';
import { param } from 'express-validator';

const removeFunction = Router();

async function removeFunctionController(req: Request, res: Response): Promise<void> {
  try {
    const { id: _id } = req.params;

    await Func.deleteMany({ _id });

    createSuccessResponse(res);
  } catch (err) {
    console.log(err);
    createErrorResponse(res, 400);
  }
}

removeFunction.delete('/:id', [param('id').isMongoId()], checkValidation, removeFunctionController);
export { removeFunction };
