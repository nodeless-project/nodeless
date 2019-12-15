import { Router } from 'express';
import { getFunctions } from './get/getFunctions';
import { changeFunction } from './put/changeFunction';
import { addNewFunction } from './post/addNewFunction';
import { removeFunction } from './delete/removeFunction';
import { getFunctionById } from './get/getFunctionById';

const manager = new Router();

// GET
manager.use(getFunctions);
manager.use(getFunctionById);

// POST
manager.use(addNewFunction);

// PUT
manager.use(changeFunction);

// REMOVE
manager.use(removeFunction);

export default manager;
