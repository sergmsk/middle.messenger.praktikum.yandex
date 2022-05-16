import './index.scss';
import Block from '../../utils/Block';

interface LinkProps {
  href: string;
  label?: string;
  extendClass?: string;
  onClick?: () => void;
}

export class Link extends Block {
  constructor({
                href,
                label = '',
                extendClass = '',
                onClick,
              }: LinkProps) {
    super({
      href,
      label,
      extendClass,
      events: {
        click: onClick,
      },
    });
  }

  static getName(): string {
    return 'Link';
  }

  render(): string {
    // language=hbs
    return `
        <a class="button-link {{ extendClass }}" href="/{{ href }}">{{ label }}</a>
    `;
  }
}