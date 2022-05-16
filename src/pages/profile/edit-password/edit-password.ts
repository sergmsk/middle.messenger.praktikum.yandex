import { UserUpdatePasswordProps } from '../../../api/UserAPI';
import AuthController from '../../../controllers/AuthController';
import UserController from '../../../controllers/UserController';
import Block from '../../../utils/Block';
import Validator, { onCheckFormFields } from '../../../utils/Validator';
import { Props } from '../../../utils/types';

let fields: NodeListOf<Element>;
let button: HTMLButtonElement | null = null;

export class EditPasswordPage extends Block {
  getStateFromProps(): void {
    this.state = {
      handleChangeInput: () => {
        Validator(button, fields);
      },
      onSaveChanges: async (e: Event) => {
        e.preventDefault();
        const validFields = onCheckFormFields(button, fields) as unknown as UserUpdatePasswordProps;

        if (Object.keys(validFields).length) {
          await UserController.updatePassword({
            newPassword: validFields.newPassword,
            oldPassword: validFields.oldPassword,
          });
          await AuthController.logout();
        } else {
          console.error('Ошибка: Заполните форму согласно описаниям полей');
        }
      },
    }
  }

  componentDidMount(): void {
    if (!(this.props as Props).user.profile) {
      (this.props as Props).router.go('/');
    } else {
      if (!fields?.length) {
        fields = document.querySelectorAll('.input-field');
        button = document.querySelector('.button');
        Validator(button, fields);
      }
    }
  }

  componentDidUpdate(): boolean {
    if (!(this.props as Props).user.profile) {
      (this.props as Props).router.go('/');
    }

    return true;
  }

  render(): string {
    // language=hbs
    return `
        <section id="profile-edit-password" class="profile-wrapper">
            {{{ ButtonBack href="settings" }}}
            <div class="profile-inner">
                {{{
                    Title
                        label="Изменить пароль"
                }}}
                <div class="profile">
                    <div class="profile__left">
                        {{{
                            Avatar
                                  url=this.user.profile.avatar
                                  disabled=true
                        }}}
                        <div class="profile__controls">
                            {{{
                                Button
                                    name="save"
                                    label="Сохранить"
                                    form="profile-edit-password"
                                    onClick=onSaveChanges
                            }}}
                            {{{
                                Link
                                    label="Назад в профиль"
                                    href="settings"
                            }}}
                        </div>
                    </div>
                    <div class="profile__right">
                        <form id="profile-edit-password-form" name="profile-edit-password" class="form">
                            <section class="form__fields">
                                {{{
                                    Input
                                        ref="oldPassword"
                                        name="oldPassword"
                                        type="password"
                                        label="Старый пароль"
                                        onChange=handleChangeInput
                                }}}
                                {{{
                                    Input
                                        ref="newPassword"
                                        name="newPassword"
                                        type="password"
                                        label="Новый пароль"
                                        onChange=handleChangeInput
                                }}}
                                {{{
                                    Input
                                        ref="newPasswordConfirm"
                                        name="newPasswordConfirm"
                                        type="password"
                                        label="Новый пароль (еще раз)"
                                        onChange=handleChangeInput
                                }}}
                            </section>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `;
  }
}