import { connect } from '../../store';
import { withRouter } from '../../utils/Router';

import { MessengerPage } from './messenger';

export { MessengerPage } from './messenger';

export default withRouter(connect(state => ({ user: state.user || {}, chats: state.chats || {}, modal: state.modal || {} }), MessengerPage));