import Block from '../utils/Block';
import { Store } from '../utils/store';
import { Props } from '../utils/types';

import chats from './chats';
import modal from './modal';
import user from './user';

export const store = new Store({
  user,
  chats,
  modal,
});


export function connect(stateToProps: (state: Props) => any, Component: typeof Block): any {
  return class WithStore extends Component {
    constructor(props: Props) {
      super({...props, ...stateToProps(store.getState())});
    }

    componentDidMount(props: Props) {
      super.componentDidMount(props);

      store.on('changed', () => {
        this.setProps({
          ...this.props,
          ...stateToProps(store.getState())
        });
      });
    }
  };
}