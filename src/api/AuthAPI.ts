import BaseAPI from './BaseAPI';
import { UserData } from './UserAPI';

export interface LoginData {
  login: string;
  password: string;
}

export type SignUpData = Omit<UserData, 'id' | 'display_name' | 'avatar'> & { password: string };

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signup(data: SignUpData): Promise<{ id: number }> {
    return this.http.post('/signup', data);
  }

  login(data: LoginData): Promise<void> {
    return this.http.post('/signin', data);
  }

  logout(): Promise<void> {
    return this.http.post('/logout');
  }

  read(): Promise<UserData> {
    return this.http.get('/user');
  }
}