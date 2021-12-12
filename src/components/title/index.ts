import DefaultComponent from '../../js/utils/default-component';

import template from './index.tmpl';

export default class Title extends DefaultComponent {
  constructor(props: { [key: string]: unknown }) {
    super('h1', props);
    this.props = props;
  }

  render(): string {
    return this._compile(template(), this.props);
  }
}
