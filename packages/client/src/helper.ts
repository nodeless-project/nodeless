export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function sleep(ms): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

export function compareCorrelationIdInMessage(id: string, message: any) {
  return id === message.properties.correlationId;
}

export function getFunctionAction(functionId: string, params: any): { functionId: string; params: any } {
  return { functionId, params };
}
