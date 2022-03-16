require("babel-polyfill");

import AuthController from './controllers/AuthController';
import _404 from './pages/404';
import _500 from './pages/500';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import MessengerPage from './pages/messenger';
import ProfilePage from './pages/profile';
import EditDataPage from './pages/profile/edit-data';
import EditPasswordPage from './pages/profile/edit-password';
import SignUpPage from './pages/signup';
import Block from './utils/Block';
import registerComponent, { BlockConstructable } from './utils/RegisterComponent';
import Router from './utils/Router';

const components = require('./components/**/index.ts') as {[key: string]: { default: Block }};

Object.values(components).forEach(component => registerComponent(component.default as unknown as BlockConstructable));

AuthController.fetchUser()
  .then(() => {
    const router = new Router();

    router
      .use('/', HomePage)
      .use('/login', LoginPage)
      .use('/sign-up', SignUpPage)
      .use('/messenger', MessengerPage)
      .use('/settings', ProfilePage)
      .use('/settings/edit/data', EditDataPage)
      .use('/settings/edit/password', EditPasswordPage)
      .use('/404', _404)
      .use('/500', _500)
      .start();
  });