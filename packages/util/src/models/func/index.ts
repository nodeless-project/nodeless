import mongoose from 'mongoose';
import { FuncSchema } from './schema';

export const Func = mongoose.model('funcs', FuncSchema);
export default Func;
