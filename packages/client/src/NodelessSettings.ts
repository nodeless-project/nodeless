import { NODLESS_FUNCTIONS_QUEUE } from './constants';

export interface NodelessSettingsType {
  connectionURL?: string;
  functionQueue?: string;
}

export class NodelessSettings {
  private connectionURL;
  private functionQueue;

  constructor({ connectionURL, functionQueue }: NodelessSettingsType) {
    if (!connectionURL) throw new Error('Connection URL is required.');

    this.connectionURL = connectionURL;
    this.functionQueue = functionQueue || NODLESS_FUNCTIONS_QUEUE;
  }

  public getConnectionURL(): string {
    return this.connectionURL;
  }

  public setConnectionURL(connectionURL: string): void {
    this.connectionURL = connectionURL;
  }

  public getFunctionQueue(): string {
    return this.functionQueue;
  }

  public setFunctionQueue(functionQueue: string): void {
    this.functionQueue = functionQueue;
  }
}
