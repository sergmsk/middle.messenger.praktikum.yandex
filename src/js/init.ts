import render from './render/';
import router from './router/';

export default (): void => {
  document.addEventListener('DOMContentLoaded', () => {
    render(router());
  });
};