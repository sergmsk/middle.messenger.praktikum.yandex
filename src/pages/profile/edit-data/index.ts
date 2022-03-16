import { connect } from '../../../store';
import { withRouter } from '../../../utils/Router';

import { EditDataPage } from './edit-data';

export { EditDataPage } from './edit-data';

export default withRouter(connect(state => ({ user: state.user || {} }), EditDataPage));