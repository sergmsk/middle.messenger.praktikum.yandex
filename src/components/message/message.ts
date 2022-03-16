import './index.scss';
import { ChatMessage } from '../../api/ChatsAPI';
import Block from '../../utils/Block';

interface MessageProps {
  item: ChatMessage;
  currentUserId: number;
}

export class Message extends Block {
  constructor({
                item,
                currentUserId,
              }: MessageProps) {
    super({
      item,
      currentUserId,
      isMyMessage: currentUserId === Number(item.user_id),
    });
  }

  static getName(): string {
    return 'Message';
  }

  render(): string {
    // language=hbs
    return `
        <div class="message {{#if isMyMessage }}message--my{{/if}}">
            {{#if item.content }}
                <p class="message__text">{{ item.content }}</p>
            {{/if}}
            {{#if img }}
                <img class="message__image" src="{{ img }}" alt="image">
            {{/if}}
            <div class="message__date">{{ item.time }}</div>
        </div>
    `;
  }
}