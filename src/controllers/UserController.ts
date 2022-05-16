import { UserAPI, SearchUsersProps, UserData, UserUpdatePasswordProps, UserUpdateProfileProps } from '../api/UserAPI';
import { store } from '../store';
import { setUser, setResultSearchUsers, clearResultSearchUsers } from '../store/user';
import { Action } from '../utils/store';

class UserController {
  private api: UserAPI;

  constructor() {
    this.api = new UserAPI();
  }

  async updateProfile(data: UserUpdateProfileProps) {
    try {
      const user: UserData = await this.api.updateProfile(data);

      store.dispatch(setUser(user) as Action);
    } catch (e) {
      console.error(e.reason);
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const user: UserData = await this.api.updateAvatar(data);

      store.dispatch(setUser(user) as Action);
    } catch (e) {
      console.error(e.reason);
    }
  }

  async updatePassword(data: UserUpdatePasswordProps) {
    try {
      await this.api.updatePassword(data);
    } catch (e) {
      console.error(e.reason);
    }
  }

  async searchUsers(data: SearchUsersProps): Promise<[UserData] | undefined> {
    try {
      const users: [UserData] = await this.api.searchUsers(data);

      store.dispatch(setResultSearchUsers(users) as Action);
      return users;
    } catch (e) {
      console.error(e.reason);
      return e.reason;
    }
  }

  async clearSearchUsers() {
    store.dispatch(clearResultSearchUsers() as Action);
  }
}

export default new UserController();