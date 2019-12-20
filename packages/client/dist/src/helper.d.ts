export declare function generateUUID(): string;
export declare function sleep(ms: any): Promise<void>;
export declare function compareCorrelationIdInMessage(id: string, message: any): boolean;
export declare function getFunctionAction(functionId: string, params: any): {
    functionId: string;
    params: any;
};
