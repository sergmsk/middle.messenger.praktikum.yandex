import sinon from 'sinon';

import { UserAPI } from './UserAPI';

describe('User API', () => {
  const baseURL= 'https://ya-praktikum.tech/api/v2/user';
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  let api: UserAPI;

  beforeEach(() => {
    api = new UserAPI();
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

  it('Endpoint - updateProfile', () => {
    const payload = {
      first_name: '',
      second_name: '',
      display_name: '',
      login: '',
      email: '',
      phone: '',
    };
    const url = `${baseURL}/profile`;

    api.updateProfile(payload);

    expect(requests[0].method).toEqual('Put');
    expect(requests[0].requestBody).toEqual(JSON.stringify(payload));
    expect(requests[0].url).toEqual(url);
  });

  it('Endpoint - updateAvatar', () => {
    const payload = {} as FormData;
    const url = `${baseURL}/profile/avatar`;

    api.updateAvatar(payload);

    expect(requests[0].method).toEqual('Put');
    expect(requests[0].requestBody).toEqual(payload);
    expect(requests[0].url).toEqual(url);
  });

  it('Endpoint - updatePassword', () => {
    const payload = {
      oldPassword: '',
      newPassword: '',
    };
    const url = `${baseURL}/password`;

    api.updatePassword(payload);

    expect(requests[0].method).toEqual('Put');
    expect(requests[0].requestBody).toEqual(JSON.stringify(payload));
    expect(requests[0].url).toEqual(url);
  });

  it('Endpoint - searchUsers', () => {
    const payload = {
      login: '',
    };
    const url = `${baseURL}/search`;

    api.searchUsers(payload);

    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toEqual(JSON.stringify(payload));
    expect(requests[0].url).toEqual(url);
  });
});