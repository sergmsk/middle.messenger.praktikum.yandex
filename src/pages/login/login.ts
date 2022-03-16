import { LoginData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';
import Block from '../../utils/Block';
import Validator, { onCheckFormFields } from '../../utils/Validator';
import { Props } from '../../utils/types';

let fields: NodeListOf<Element>;
let button: HTMLButtonElement | null = null;

export class LoginPage extends Block {
  getStateFromProps(): void {
    this.state = {
      handleChangeInput: () => {
        Validator(button, fields);
      },
      onLogin: async (e: Event) => {
        e.preventDefault();
        const validFields = onCheckFormFields(button, fields) as unknown as LoginData;

        if (Object.keys(validFields).length) {
          await AuthController.login(validFields);
        } else {
          console.error('Ошибка: Заполните форму согласно описаниям полей');
        }
      },
    }
  }

  componentDidMount(): void {
    if ((this.props as Props).user.profile) {
      (this.props as Props).router.go('/messenger');
    }

    if (!fields?.length) {
      fields = document.querySelectorAll('.input-field');
      button = document.querySelector('.button');
      Validator(button, fields);
    }
  }

  componentDidUpdate(): boolean {
    if ((this.props as Props).user.profile) {
      (this.props as Props).router.go('/messenger');
    }

    return true;
  }

  render(): string {
    // language=hbs
    return `
        <section id="login-page" class="section-wrapper">
            {{{
                Title
                    label="Авторизация"
            }}}
            <form id="login" name="login" class="form">
                <section class="form__fields">
                    {{{
                        Input
                            ref="login"
                            name="login"
                            label="Логин"
                            placeholder="Введите логин"
                            onChange=handleChangeInput
                    }}}
                    {{{
                        Input
                            ref="password"
                            name="password"
                            type="password"
                            label="Пароль"
                            placeholder="Введите пароль"
                            onChange=handleChangeInput
                    }}}
                </section>
                <section class="form__controls">
                    {{{
                        Button
                              name="login"
                              label="Войти"
                              form="login"
                              onClick=onLogin
                    }}}
                    {{{
                        Link
                            label="Ещё не зарегистрированы?"
                            href="sign-up"
                    }}}
                </section>
            </form>
        </section>`;
  }
}