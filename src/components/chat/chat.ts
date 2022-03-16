import './index.scss';
import { ChatData } from '../../api/ChatsAPI';
import Block from '../../utils/Block';

interface ChatProps {
  item: ChatData;
  onClick?: () => void;
}

export class Chat extends Block {
  constructor({
                item,
                onClick,
              }: ChatProps) {
    super({
      item,
      events: {
        click: onClick,
      },
    });
  }

  static getName(): string {
    return 'Chat';
  }

  render(): string {
    // language=hbs
    return `
        <button type="button" class="chat" data-chat-id="{{ item.id }}">
            <div class="chat__avatar">
                {{#if item.avatar }}
                    <img src="{{ item.avatar }}" alt="avatar">
                {{else}}
                    <div class="chat__avatar-default"></div>
                {{/if}}
            </div>
            <div class="chat__info">
                <h3 class="chat__title">{{ item.title }}</h3>
                <p class="chat__text">
                    {{ item.last_message.content }}
                </p>
            </div>
            <div class="chat__info">
                <span class="chat__date">{{ item.last_message.time }}</span>
                {{#if item.unread_count }}
                    <div class="chat__notification-wrapper">
                        <span class="chat__notification">{{ item.unread_count }}</span>
                    </div>
                {{/if}}
            </div>
        </button>
    `;
  }
}