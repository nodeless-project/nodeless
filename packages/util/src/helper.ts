import { Types } from 'mongoose';

export function isObjectId(value: string) {
  return Types.ObjectId.isValid(value);
}

export function writeValueToObject(object: object, key: any, value: any) {
  if (!value && value !== null && typeof value !== 'boolean' && typeof value !== 'number') {
    return;
  }

  if (typeof value === 'string') {
    object[key] = value.trim();
    return;
  }

  object[key] = value;
}
