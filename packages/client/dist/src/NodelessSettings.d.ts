export interface NodelessSettingsType {
    connectionURL?: string;
    functionQueue?: string;
}
export declare class NodelessSettings {
    private connectionURL;
    private functionQueue;
    constructor({ connectionURL, functionQueue }: NodelessSettingsType);
    getConnectionURL(): string;
    setConnectionURL(connectionURL: string): void;
    getFunctionQueue(): string;
    setFunctionQueue(functionQueue: string): void;
}
