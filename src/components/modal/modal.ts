import './index.scss';
import { ModalProps } from '../../controllers/ModalController';
import Block from '../../utils/Block';

export class Modal extends Block {
  constructor({
                item,
                onClick,
                onChange,
              }: {
                item: ModalProps;
                onClick?: () => void;
                onChange?: () => void;
              }) {
    super({
      item,
      events: {
        click: onClick,
        input: onChange,
      },
    });
  }

  static getName(): string {
    return 'Modal';
  }

  render(): string {
    // language=hbs
    return `
        <div class="modal {{#if item.active }}modal--active{{/if}}" >
            <div class="modal__inner">
                <div class="modal__wrapper">
                    <button name="close" type="button" class="modal__close"></button>
                    {{{
                        Title
                              label=item.title
                    }}}
                    {{{
                        Input
                              ref=item.data.input.name
                              name=item.data.input.name
                              label=item.data.input.label
                              placeholder=item.data.input.placeholder
                    }}}
                    <div class="modal__button-wrapper">
                        {{{
                            Button
                                  name=item.data.button.name
                                  label=item.data.button.label
                        }}}
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}