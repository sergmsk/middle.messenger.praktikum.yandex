export default class EventBus {
  listeners: {
    [key: string]: Array<(...rest: unknown[]) => void>,
  };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: () => unknown): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: () => unknown): void {
    this.checkEvent(event);
    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
  }

  emit(event: string, ...args: unknown[]): void {
    this.checkEvent(event);
    this.listeners[event].forEach(listener => listener(...args));
  }

  checkEvent(event: string): void {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }
  }
}