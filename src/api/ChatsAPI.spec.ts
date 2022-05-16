import sinon from 'sinon';

import { ChatsAPI } from './ChatsAPI';

describe('Chats API', () => {
  const baseURL = 'https://ya-praktikum.tech/api/v2/chats';
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  let api: ChatsAPI;

  beforeEach(() => {
    api = new ChatsAPI();
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

  it('Endpoint - createChat', () => {
    const payload = {
      title: '',
    };
    const url = `${baseURL}`;

    api.createChat(payload);

    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toEqual(JSON.stringify(payload));
    expect(requests[0].url).toEqual(url);
  });

  it('Endpoint - addUsersInChat', () => {
    const payload = {
      users: [1],
      chatId: 1,
    };
    const url = `${baseURL}/users`;

    api.addUsersInChat(payload);

    expect(requests[0].method).toEqual('Put');
    expect(requests[0].requestBody).toEqual(JSON.stringify(payload));
    expect(requests[0].url).toEqual(url);
  });

  it('Endpoint - deleteUsersInChat', () => {
    const payload = {
      users: [1],
      chatId: 1,
    };
    const url = `${baseURL}/users`;

    api.deleteUsersInChat(payload);

    expect(requests[0].method).toEqual('Delete');
    expect(requests[0].requestBody).toEqual(JSON.stringify(payload));
    expect(requests[0].url).toEqual(url);
  });

  it('Endpoint - getToken', () => {
    const payload = {
      chatId: 1,
    };
    const url = `${baseURL}/token/${payload.chatId}`;

    api.getToken(payload);


    expect(requests[0].method).toEqual('Post');
    expect(requests[0].requestBody).toEqual(undefined);
    expect(requests[0].url).toEqual(url);
  });

  it('Endpoint - read', () => {
    const url = `${baseURL}/`;

    api.read();

    expect(requests[0].method).toEqual('Get');
    expect(requests[0].requestBody).toEqual(undefined);
    expect(requests[0].url).toEqual(url);
  });
});