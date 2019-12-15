import { Router, Request, Response } from 'express';

import { createErrorResponse, createSuccessResponse } from '../../messages';
import { Func } from '@nodeless/util';

const getFunctions = Router();

async function getFunctionsController(req: Request, res: Response): Promise<void> {
  try {
    const funcs = await Func.find({});

    createSuccessResponse(
      res,
      funcs.map(func => func.getShortResponse()),
    );
  } catch (err) {
    console.log(err);
    createErrorResponse(res, 400);
  }
}

getFunctions.get('/', getFunctionsController);
export { getFunctions };
