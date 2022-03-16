import { connect } from '../../store';
import { withRouter } from '../../utils/Router';

import { SignUpPage } from './signup';

export { SignUpPage } from './signup';

export default withRouter(connect(state => ({ user: state.user || {} }), SignUpPage));