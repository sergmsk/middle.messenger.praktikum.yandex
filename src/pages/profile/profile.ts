import './index.scss';
import AuthController from '../../controllers/AuthController';
import Block from '../../utils/Block';
import { Props } from '../../utils/types';

export class ProfilePage extends Block {
  getStateFromProps(): void {
    this.state = {
      onLogout: (e: Event) => {
        e.preventDefault();
        AuthController.logout();
      },
    }
  }

  componentDidMount(): void {
    if (!(this.props as Props).user.profile) {
      (this.props as Props).router.go('/');
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
      <section id="profile" class="profile-wrapper">
          {{{ ButtonBack href="messenger" }}}
          <div class="profile-inner">
            {{{
                Title
                    label="Профиль"
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
                      Link
                          label="Изменить данные"
                          href="settings/edit/data"
                  }}}
                  {{{
                      Link
                          label="Изменить пароль"
                          href="settings/edit/password"
                  }}}
                  {{{
                      Link
                          label="Выйти"
                          href=""
                          extendClass="red"
                          onClick=onLogout
                  }}}
                </div>
              </div>
              <div class="profile__right">
                  <form id="profile-form" name="profile" class="form">
                      <section class="form__fields">
                          {{{
                              Input
                                  ref="email"
                                  name="email"
                                  label="Почта"
                                  disabled=true
                                  value=this.user.profile.email
                          }}}
                          {{{
                              Input
                                  ref="login"
                                  name="login"
                                  label="Логин"
                                  disabled=true
                                  value=this.user.profile.login
                          }}}
                          {{{
                              Input
                                  ref="first_name"
                                  name="first_name"
                                  label="Имя"
                                  disabled=true
                                  value=this.user.profile.first_name
                          }}}
                          {{{
                              Input
                                  ref="second_name"
                                  name="second_name"
                                  label="Фамилия"
                                  disabled=true
                                  value=this.user.profile.second_name
                          }}}
                          {{{
                              Input
                                  ref="display_name"
                                  name="display_name"
                                  label="Имя в чате"
                                  disabled=true
                                  value=this.user.profile.display_name
                          }}}
                          {{{
                              Input
                                  ref="phone"
                                  name="phone"
                                  label="Телефон"
                                  disabled=true
                                  value=this.user.profile.phone
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