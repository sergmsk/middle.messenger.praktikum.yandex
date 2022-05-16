const handleShowError = (field: HTMLInputElement, input: HTMLInputElement | undefined, isValid: boolean) => {
  const children = Array.from(field.children) as HTMLInputElement[];
  const errorElement: HTMLInputElement | Record<string, unknown> = children.find(item => item.className.includes('input-field__description--error')) || {};
  const name = input?.name || '';

  if (isValid) {
    errorElement.textContent = '';
  } else {
    switch (name) {
      case 'first_name':
      case 'second_name':
      case 'display_name':
        errorElement.textContent = 'Ошибка: значение должно удовлетворять требованиям - латиница или кириллица,' +
          ' первая буква должна быть' +
          ' заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)';
        break;
      case 'login':
        errorElement.textContent = 'Ошибка: значение должно удовлетворять требованиям - от 3 до 20 символов,' +
          ' латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)';
        break;
      case 'email':
        errorElement.textContent = 'Ошибка: значение должно удовлетворять требованиям - латиница, может включать' +
          ' цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.';
        break;
      case 'password':
      case 'oldPassword':
      case 'newPassword':
        errorElement.textContent = 'Ошибка: значение должно удовлетворять требованиям - от 8 до 40 символов,' +
          ' обязательно хотя бы одна заглавная буква и цифра.';
        break;
      case 'passwordConfirm':
      case 'newPasswordConfirm':
        errorElement.textContent = 'Ошибка: пароли не совпадают.';
        break;
      case 'phone':
        errorElement.textContent = 'Ошибка: значение должно удовлетворять требованиям - от 10 до 15 символов,' +
          ' состоит из цифр, может начинается с плюса.';
        break;
      case 'message':
        errorElement.textContent = 'Ошибка: значение должно удовлетворять требованиям - не должно быть пустым';
        break;
      default:
        errorElement.textContent = '';
        break;
    }
  }
};
const checkValidation = (input: HTMLInputElement | undefined) => {
  let isValid = false;
  const regExp: {
    [key: string]: {
      [key: string]: RegExp;
    };
  } = {
    name: {
      firstCharUpper: /^[А-ЯЁA-Z]+/g,
      str: /^[А-ЯЁа-яёA-Za-z-]*$/g,
    },
    login: {
      onlyNumber: /^[0-9]*$/g,
      length: /^.{3,20}$/g,
      str: /^[A-Za-z0-9_-]*$/g,
    },
    email: {
      str: /^[a-zA-z0-9\-]+@[a-zA-z0-9\-]+\.[a-zA-z0-9]+$/g,
    },
    password: {
      length: /^.{8,40}$/g,
      str: /^((?=.*[0-9])|(?=.*[A-Za-z]+))(?=.*[A-Z])(?!.*\s)(?!.*[а-яёА-ЯЁ]).*$/g,
    },
    phone: {
      length: /^.{10,15}$/g,
      str: /^\+?[0-9]*$/g,
    },
  };

  const name: string = input?.name || '';
  const value: string = input?.value || '';
  switch (name) {
    case 'first_name':
    case 'second_name':
    case 'display_name':
      const firstCharUpper = regExp.name.firstCharUpper.test(value);
      isValid = regExp.name.str.test(value);

      return firstCharUpper && isValid;
    case 'login':
      const onlyNumber = regExp.login.onlyNumber.test(value);
      const lengthLogin = regExp.login.length.test(value);
      isValid = regExp.login.str.test(value);

      return !onlyNumber && lengthLogin && isValid;
    case 'email':
      return regExp.email.str.test(value);
    case 'password':
    case 'newPassword':
    case 'oldPassword':
      const lengthPassword = regExp.password.length.test(value);
      isValid = regExp.password.str.test(value);

      return lengthPassword && isValid;
    case 'passwordConfirm':
    case 'newPasswordConfirm':
      const passwordInput: HTMLInputElement | null = document.querySelector('[name="password"]') || document.querySelector('[name="newPassword"]');

      return passwordInput?.value === value;
    case 'phone':
      const lengthPhone = regExp.phone.length.test(value);
      isValid = regExp.phone.str.test(value);

      return lengthPhone && isValid;
    case 'message':
      return !!value.length;
    default:
      return true;
  }
};

export const onCheckFormFields = (button: HTMLButtonElement | null, fields: NodeListOf<Element>): { [key: string]: string } => {
  const validInputs: {
    [key: string]: string;
  } = {};

  if (fields.length) {
    Array.from(fields).forEach((field: HTMLInputElement) => {
      const children = Array.from(field.children) as HTMLInputElement[];
      const input: HTMLInputElement | undefined = children.find(({ localName }) => localName === 'input');
      const name = input?.name || '';
      const value = input?.value || '';
      const isValid = checkValidation(input);

      if (isValid) {
        validInputs[name] = value;
      }

      handleShowError(field, input, isValid);
    });
  }

  if (Object.keys(validInputs).length === Array.from(fields).length) {
    button?.removeAttribute('disabled');
    return validInputs;
  }

  button?.setAttribute('disabled', 'true');
  return {};
};
export default (button: HTMLButtonElement | null, fields: NodeListOf<Element>): void => {
  if (fields.length) {
    Array.from(fields).forEach(field => {
      const children = Array.from(field.children) as HTMLInputElement[];
      const input: HTMLInputElement | undefined = children.find(({ localName }) => localName === 'input');
      input?.addEventListener('focus', () => onCheckFormFields(button, fields));
      input?.addEventListener('blur', () => onCheckFormFields(button, fields));
    });
  }
};