import HTTPTransport from './Http';

export default abstract class BaseAPI {
  protected http: HTTPTransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPTransport(endpoint);
  }

  public abstract read?(identifier?: string): Promise<unknown>;
}