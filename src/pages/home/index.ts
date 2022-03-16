import { connect } from '../../store';
import { withRouter } from '../../utils/Router';

import { HomePage } from './home';

export { HomePage } from './home';

export default withRouter(connect(state => ({ user: state.user || {} }), HomePage));