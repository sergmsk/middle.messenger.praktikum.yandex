import { ModalProps } from '../controllers/ModalController';
import { Action } from '../utils/store';
import { Props } from '../utils/types';

const MODAL_OPEN = 'modal/MODAL_OPEN';
const MODAL_CLOSE = 'modal/MODAL_CLOSE';

export const modalOpen = (payload: ModalProps): Props => ({
  type: MODAL_OPEN,
  payload,
});

export const modalClose = (): Props => ({
  type: MODAL_CLOSE,
});

export default (state = { active: false, title: '', type: '', data: null }, action: Action): Props => {
  switch (action.type) {
    case MODAL_OPEN:
      return action.payload;
    case MODAL_CLOSE:
      return { active: false, title: '', type: '', data: null };
    default:
      return state;
  }
}