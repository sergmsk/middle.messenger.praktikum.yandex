import { connect } from '../../../store';
import { withRouter } from '../../../utils/Router';

import { EditPasswordPage } from './edit-password';

export { EditPasswordPage } from './edit-password';

export default withRouter(connect(state => ({ user: state.user || {} }), EditPasswordPage));