import './index.scss';
import { ChatData } from '../../api/ChatsAPI';
import { UserData } from '../../api/UserAPI';
import Block from '../../utils/Block';

interface ChatOpenedProps {
  item: ChatData;
  activePanelButtons: boolean;
  currentUser: UserData;
  onClick?: () => void;
  onChange?: () => void;
}

export class ChatOpened extends Block {
  constructor({
                item,
                activePanelButtons = false,
                currentUser,
                onClick,
                onChange,
              }: ChatOpenedProps) {
    super({
      item,
      activePanelButtons,
      currentUser,
      events: {
        click: onClick,
        input: onChange,
      },
    });
  }

  static getName(): string {
    return 'ChatOpened';
  }

  render(): string {
    // language=hbs
    return `
        <div class="open-chat {{#if item }}open-chat--active{{/if}}">
            {{#if item }}
                <div class="open-chat__header">
                    <div class="open-chat__header-info">
                        <div class="open-chat__header-avatar">
                            {{#if avatar }}
                                <img src="{{ avatar }}" alt="avatar">
                            {{else}}
                                <div class="open-chat__header-avatar-default"></div>
                            {{/if}}
                        </div>
                        <div class="open-chat__header-title">{{ item.title }}</div>
                    </div>
                    <button name="openPanelButtons" class="open-chat__header-settings">
                        <img src="/image/icons/dots.svg" alt="dots">
                    </button>
                    <div class="open-chat__header-button-wrapper {{#if activePanelButtons }}open-chat__header-button-wrapper--active{{/if}}">
                        <button name="openModalAddUser" type="button" class="open-chat__header-button">Добавить пользователя</button>
                        <button name="openModalDeleteUser" type="button" class="open-chat__header-button">Удалить пользователя</button>
                    </div>
                </div>
                <div class="open-chat__messages">
                    {{#if item.messages }}
                        {{#each item.messages }}
                            {{{
                              Message
                                    item=this
                                    currentUserId=../this.currentUser.id
                            }}}
                        {{/each}}
                    {{else}}
                        Сообщений нет
                    {{/if}}
                </div>
                <div class="open-chat__controls">
                    <button class="open-chat__button-upload" type="button">
                        <img src="/image/icons/upload.svg" alt="upload">
                    </button>
                    {{{
                        Input
                            name="message"
                            placeholder="Сообщение"
                            isNotLabel=true
                    }}}
                    {{{
                        ButtonSend
                    }}}
                </div>
            {{else}}
                <div class="open-chat__empty">
                    <h3 class="open-chat__empty-title">Выберите чат чтобы отправить сообщение</h3>
                </div>
            {{/if}}
        </div>
    `;
  }
}