import './index.scss';
import Block from '../../utils/Block';

interface TitleProps {
  label: string;
  extendClass?: string;
}

export class Title extends Block {
  constructor({
                label,
                extendClass = '',
              }: TitleProps) {
    super({
      label,
      extendClass,
    });
  }

  static getName(): string {
    return 'Title';
  }

  render(): string {
    // language=hbs
    return `<h1 class="title {{ extendClass }}">{{ label }}</h1>`;
  }
}