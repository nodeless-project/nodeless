import { NodelessSettingsType } from './NodelessSettings';
export declare class Nodeless {
    private channel;
    private privateQueue;
    private connection;
    private settings;
    private events;
    private constructor();
    static init(connectionURL: string, options?: NodelessSettingsType): Promise<Nodeless>;
    connect(): Promise<void>;
    getReplyOptions(correlationId: string): {
        correlationId: string;
        replyTo: any;
    };
    call(functionId: string, params: any): Promise<any>;
    callWithoutReturnValue(functionId: string, params: any): Promise<void>;
    putJob(functionId: string, params: any, options?: {}): Promise<any>;
}
