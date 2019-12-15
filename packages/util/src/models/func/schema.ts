import { Schema } from 'mongoose';

export const FuncSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);
