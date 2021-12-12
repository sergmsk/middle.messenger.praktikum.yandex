import DefaultComponent from '../../js/utils/default-component';

import template from './index.tmpl';

export default class Button extends DefaultComponent {
  constructor(props: { [key: string]: unknown }) {
    super('div', props);
    this.props = props;
  }

  render(): string {
    return this._compile(template(), this.props);
  }
}