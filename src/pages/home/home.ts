import Block from '../../utils/Block';
import { Props } from '../../utils/types';

export class HomePage extends Block {
  componentDidMount(): void {
    if ((this.props as Props).user.profile) {
      (this.props as Props).router.go('/messenger');
    } else {
      (this.props as Props).router.go('/login');
    }
  }

  render(): string {
    return `<div></div>`;
  }
}