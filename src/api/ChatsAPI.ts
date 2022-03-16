import BaseAPI from './BaseAPI';
import { UserData } from './UserAPI';

export interface ChatData {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: UserData;
    time: string;
    content: string;
  };
  messages?: ChatMessage[];
}

export interface createChatProps {
  title: string;
}

export interface addUsersInChatProps {
  users: number[];
  chatId: number;
}

export interface ChatTokenData {
  chatId: number;
}

export interface ChatTokenResponse {
  token: string;
}

export interface ChatFile {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export interface ChatMessage {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: ChatFile;
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  createChat(data: createChatProps): Promise<void> {
    return this.http.post('', data);
  }

  addUsersInChat(data: addUsersInChatProps): Promise<void> {
    return this.http.put('/users', data);
  }

  deleteUsersInChat(data: addUsersInChatProps): Promise<void> {
    return this.http.delete('/users', data);
  }

  getToken({ chatId }: ChatTokenData): Promise<ChatTokenResponse> {
    return this.http.post(`/token/${chatId}`);
  }

  read(): Promise<[ChatData]> {
    return this.http.get();
  }
}