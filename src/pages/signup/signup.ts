import { SignUpData } from '../../api/AuthAPI';
import AuthController from '../../controllers/AuthController';
import Block from '../../utils/Block';
import Validator, { onCheckFormFields } from '../../utils/Validator';
import { Props } from '../../utils/types';

let fields: NodeListOf<Element>;
let button: HTMLButtonElement | null = null;

export class SignUpPage extends Block {
  getStateFromProps(): void {
    this.state = {
      handleChangeInput: () => {
        Validator(button, fields);
      },
      onSignUp: async (e: Event) => {
        e.preventDefault();
        const validFields = onCheckFormFields(button, fields) as unknown as SignUpData;

        if (Object.keys(validFields).length) {
          await AuthController.signup(validFields);
        } else {
          console.error('Ошибка: Заполните форму согласно описаниям полей');
        }
      },
    };
  }

  componentDidMount(): void {
    if (!fields?.length) {
      fields = document.querySelectorAll('.input-field');
      button = document.querySelector('.button');
      Validator(button, fields);
    }

    if ((this.props as Props).user.profile) {
      (this.props as Props).router.go('/messenger');
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
        <section id="signup-page" class="section-wrapper">
            {{{
                Title
                    label="Регистрация"
            }}}
            <form id="signup" name="signup" class="form">
                <section class="form__fields">
                    {{{
                        Input
                            ref="email"
                            name="email"
                            type="email"
                            label="Почта"
                            placeholder="Введите почту example@mail.com"
                            onChange=handleChangeInput
                    }}}
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
                            ref="first_name"
                            name="first_name"
                            label="Имя"
                            placeholder="Введите имя"
                            onChange=handleChangeInput
                    }}}
                    {{{
                        Input
                            ref="second_name"
                            name="second_name"
                            label="Фамилия"
                            placeholder="Введите фамилию"
                            onChange=handleChangeInput
                    }}}
                    {{{
                        Input
                            ref="phone"
                            name="phone"
                            type="tel"
                            label="Телефон"
                            placeholder="Введите телефон +7 999 999 99 99"
                            onChange=handleChangeInput
                    }}}
                    {{{
                        Input
                            ref="password"
                            name="password"
                            type="password"
                            label="Пароль"
                            hint=true
                            hintDescription="Пароль должен быть не менее 8 символов"
                            placeholder="Введите пароль"
                            onChange=handleChangeInput
                    }}}
                    {{{
                        Input
                            ref="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            label="Пароль (еще раз)"
                            placeholder="Повторите введеный пароль выше"
                            onChange=handleChangeInput
                    }}}
                </section>
                <section class="form__controls">
                    {{{
                        Button
                            name="send"
                            label="Создать аккаунт"
                            form="signup"
                            onClick=onSignUp
                    }}}
                    {{{
                        Link
                            label="Войти"
                            href="login"
                    }}}
                </section>
            </form>
        </section>
    `;
  }
}