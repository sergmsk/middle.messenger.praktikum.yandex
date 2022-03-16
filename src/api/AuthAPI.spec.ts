import sinon from 'sinon';

import { AuthAPI } from './AuthAPI';

describe('Auth API', () => {
  const baseURL= 'https://ya-praktikum.tech/api/v2/auth';
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  let api: AuthAPI;

  beforeEach(() => {
    api = new AuthAPI();
    let xhr: sinon.SinonFakeXMLHttpRequestStatic;
    (global as any).XMLHttpRequest = xhr = sinon.useFakeXMLHttpRequest();

    xhr.onCreate = (request: sinon.SinonFakeXMLHttpRequest) => {
      requests.push(request);
    };
  });

  afterEach(() => {
    (global as any).XMLHttpRequest.restore();

    requests.length = 0;
  });

  it('Endpoint - signup', () => {
    const payload = {
      first_name: '',
      second_name: '',
      login: '',
      email: '',
      phone: '',
      password: '',
    };
    const url = `${baseURL}/signup`;

    api.signup(payload);

    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toEqual(JSON.stringify(payload));
    expect(requests[0].url).toEqual(url);
  });

  it('Endpoint - login', () => {
    const payload = {
      login: '',
      password: '',
    };
    const url = `${baseURL}/signin`;

    api.login(payload);

    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toEqual(JSON.stringify(payload));
    expect(requests[0].url).toEqual(url);
  });

  it('Endpoint - logout', () => {
    const url = `${baseURL}/logout`;

    api.logout();

    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toEqual(undefined);
    expect(requests[0].url).toEqual(url);
  });

  it('Endpoint - read', () => {
    const url = `${baseURL}/user`;

    api.read();

    expect(requests[0].method).toEqual('Get');
    expect(requests[0].requestBody).toEqual(undefined);
    expect(requests[0].url).toEqual(url);
  });
});