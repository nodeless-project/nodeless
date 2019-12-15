import { Router, Request, Response } from 'express';

import { createErrorResponse, createSuccessResponse } from '../../messages';
import { Func } from '@nodeless/util';
import { checkValidation } from '../../middlewares';
import { param } from 'express-validator';

const getFunctionById = Router();

async function getFunctionsController(req: Request, res: Response): Promise<void> {
  try {
    const { id: _id } = req.params;

    const func = await Func.findOne({ _id });

    createSuccessResponse(res, func.getResponse());
  } catch (err) {
    console.log(err);
    createErrorResponse(res, 400);
  }
}

getFunctionById.get('/:id', [param('id').isMongoId()], checkValidation, getFunctionsController);
export { getFunctionById };
