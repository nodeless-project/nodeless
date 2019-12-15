import { Types } from 'mongoose';

export function isObjectId(value: string) {
    return Types.ObjectId.isValid(value);
}
