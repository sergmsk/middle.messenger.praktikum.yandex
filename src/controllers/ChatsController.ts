import { ChatsAPI, ChatData, CreateChatProps, addUsersInChatProps, ChatTokenData, ChatTokenResponse, ChatMessage } from '../api/ChatsAPI';
import { store } from '../store';
import { setChats, setSelectedChat, addMessage } from '../store/chats';
import isArray from '../utils/helpers/isArray';
import { Action } from '../utils/store';

class ChatsController {
  private api: ChatsAPI;

  constructor() {
    this.api = new ChatsAPI();
  }

  async createChat(data: CreateChatProps) {
    try {
      await this.api.createChat(data);
    } catch (e) {
      console.error(e.reason);
    }
  }

  async addUsersInChat(data: addUsersInChatProps) {
    try {
      await this.api.addUsersInChat(data);
    } catch (e) {
      console.error(e.reason);
    }
  }

  async deleteUsersInChat(data: addUsersInChatProps) {
    try {
      await this.api.deleteUsersInChat(data);
    } catch (e) {
      console.error(e.reason);
    }
  }

  setSelectedChat(data: ChatData) {
    store.dispatch(setSelectedChat(data) as Action);
  }

  async fetchChats(): Promise<[ChatData] | undefined> {
    try {
      const chats = await this.api.read();

      store.dispatch(setChats(chats) as Action);

      return chats;
    } catch (e) {
      console.error(e.reason);
      return e.reason;
    }
  }

  async getToken(data: ChatTokenData): Promise<ChatTokenResponse | undefined> {
    try {
      return await this.api.getToken(data);
    } catch (e) {
      console.error(e.reason);
      return e.reason;
    }
  }

  addMessage(message: ChatMessage | ChatMessage[]) {
    if (isArray(message)) {
      for (let i = 0; i < (message as ChatMessage[]).length; i++) {
        store.dispatch(addMessage((message as ChatMessage[])[i]) as Action);
      }
    } else {
      store.dispatch(addMessage(message as ChatMessage) as Action);
    }
  }
}

export default new ChatsController();