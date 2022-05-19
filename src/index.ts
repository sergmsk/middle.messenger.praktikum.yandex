require('babel-polyfill');

import '../static/css/index.scss';

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
import registerComponent, { BlockConstructable } from './utils/RegisterComponent';
import Router from './utils/Router';

import Avatar from './components/avatar';
import Button from './components/button';
import ButtonBack from './components/button-back';
import ButtonSend from './components/button-send';
import ButtonUser from './components/button-user';
import Chat from './components/chat';
import ChatOpened from './components/chat-opened';
import Input from './components/input';
import InputSearch from './components/input-search';
import Link from './components/link';
import Message from './components/message';
import Modal from './components/modal';
import Title from './components/title';

const components = [
  Avatar,
  Button,
  ButtonBack,
  ButtonSend,
  ButtonUser,
  Chat,
  ChatOpened,
  Input,
  InputSearch,
  Link,
  Message,
  Modal,
  Title,
];

Object.values(components).forEach(component => registerComponent(component as unknown as BlockConstructable));

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