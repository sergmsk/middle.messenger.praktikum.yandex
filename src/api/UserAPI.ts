import BaseAPI from './BaseAPI';

export interface UserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface UserUpdatePasswordProps {
  oldPassword: string;
  newPassword: string;
}

export interface SearchUsersProps {
  login: string;
}

export type UserUpdateProfileProps = Omit<UserData, 'avatar' | 'id'>;

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  updateProfile(data: UserUpdateProfileProps): Promise<UserData> {
    return this.http.put('/profile', data);
  }
  updateAvatar(data: FormData): Promise<UserData> {
    return this.http.put('/profile/avatar', data, true);
  }
  updatePassword(data: UserUpdatePasswordProps): Promise<void> {
    return this.http.put('/password', data);
  }

  searchUsers(data: SearchUsersProps): Promise<[UserData]> {
    return this.http.post('/search', data);
  }

  read: undefined;
}