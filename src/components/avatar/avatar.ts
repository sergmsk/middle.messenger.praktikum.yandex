import './index.scss';
import Block from '../../utils/Block';

interface AvatarProps {
  url?: string;
  disabled?: boolean;
  onChange?: () => void;
}

export class Avatar extends Block {
  constructor({
                url = '',
                disabled = false,
                onChange,
              }: AvatarProps) {
    super({
      url,
      disabled,
      events: {
        change: onChange,
      },
    });
  }

  static getName(): string {
    return 'Avatar';
  }

  render(): string {
    // language=hbs
    return `
        {{#if url }}
            <label for="image-uploader">
                {{#if disabled }}
                    <img class="avatar avatar--disabled" src="https://ya-praktikum.tech/api/v2/resources{{ url }}" alt="person avatar">
                {{else}}
                    <img class="avatar" src="https://ya-praktikum.tech/api/v2/resources{{ url }}" alt="person avatar">
                    <input id="image-uploader" class="image-uploader" type="file" accept="image/jpeg, image/png">
                {{/if}}
            </label>
        {{else}}
            <label for="image-uploader">
                {{#if disabled }}
                    <div class="avatar avatar--disabled"></div>
                {{else}}
                    <div class="avatar"></div>
                    <input id="image-uploader" class="image-uploader" type="file" accept="image/jpeg, image/png">
                {{/if}}
            </label>
        {{/if}}
    `;
  }
}