import mongoose from 'mongoose';
import { FuncSchema } from './schema';
import { writeValueToObject } from '../../helper';

FuncSchema.methods.getShortResponse = function() {
  return {
    id: this._id,
    title: this.title,
  };
};

FuncSchema.methods.changeByObject = function({ title, code }) {
  writeValueToObject(this, 'code', code);
  writeValueToObject(this, 'title', title);
};

FuncSchema.methods.getResponse = function() {
  return {
    id: this._id,
    code: this.code,
    title: this.title,
  };
};

FuncSchema.methods.getResponse = function() {
  return {
    id: this._id,
    code: this.code,
    title: this.title,
  };
};

export const Func = mongoose.model('funcs', FuncSchema);
export default Func;
