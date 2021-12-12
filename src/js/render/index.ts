import validator from "../utils/validator";

import getTemplate from './getTemplate';

export default (route: string): void => {
  const root = document.getElementById('root') as HTMLDivElement;

  root.innerHTML = getTemplate(route);

  const accessPageForValidate: string[] = [
    'messenger',
    'profile',
    'profileEditData',
    'profileEditPassword',
    'registration',
    'login',
  ];

  if (accessPageForValidate.includes(route)) {
    const button: HTMLButtonElement | null = document.querySelector('.button');
    const fields: NodeListOf<HTMLInputElement> = document.querySelectorAll('.input-field');

    validator(button, fields);
  }
};