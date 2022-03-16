import './index.scss';
import Block from '../../utils/Block';

export class ButtonSend extends Block {
  constructor() {
    super({});
  }

  static getName(): string {
    return 'ButtonSend';
  }

  render(): string {
    // language=hbs
    return `
        <button name="sendMessage" class="open-chat__button-send button" type="button">
            <img src="/image/icons/send.svg" alt="send">
        </button>
    `;
  }
}