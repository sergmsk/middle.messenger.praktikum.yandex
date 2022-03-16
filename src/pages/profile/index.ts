import { connect } from '../../store';
import { withRouter } from '../../utils/Router';

import { ProfilePage } from './profile';

export { ProfilePage } from './profile';

export default withRouter(connect(state => ({ user: state.user || {} }), ProfilePage));