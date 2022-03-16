import './index.scss';
import { UserData } from '../../api/UserAPI';
import Block from '../../utils/Block';

interface ButtonUserProps {
  item: UserData;
  onClick?: () => void;
}

export class ButtonUser extends Block {
  constructor({
                item,
                onClick,
              }: ButtonUserProps) {
    super({
      item,
      events: {
        click: onClick,
      },
    });
  }

  static getName(): string {
    return 'ButtonUser';
  }

  render(): string {
    // language=hbs
    return `
        <button
                type="button"
                class="button-user"
                data-user-id="{{ item.id }}"
                data-user-login="{{ item.login }}"
        >
            {{ item.login }}
        </button>
    `;
  }
}