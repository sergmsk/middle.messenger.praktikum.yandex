import './index.scss';
import Block from '../../utils/Block';

interface ButtonBackProps {
  href?: string;
}

export class ButtonBack extends Block {
  constructor({ href = '' }: ButtonBackProps) {
    super({ href });
  }

  static getName(): string {
    return 'ButtonBack';
  }

  render(): string {
    // language=hbs
    return `
        <a class="button-link button-left-side" href="/{{ href }}"></a>
    `;
  }
}