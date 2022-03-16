import { store } from '../store';
import { modalOpen, modalClose } from '../store/modal';
import { Action } from '../utils/store';

export interface ModalProps {
  active: boolean;
  title: string;
  data: {
    [key: string]: unknown;
  };
}

class ModalController {
  modalOpen(payload: ModalProps) {
    store.dispatch(modalOpen(payload) as Action);
  }

  modalClose() {
    store.dispatch(modalClose() as Action);
  }
}

export default new ModalController();