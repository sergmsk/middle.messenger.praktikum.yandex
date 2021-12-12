import ButtonLink from '../../components/button-link';
import Title from '../../components/title/';
import state from '../../js/storage/state';
import createElement from "../../js/utils/createElement";

const localState = state._404;
const wrapper = createElement('section', null, []);

const title = new Title({
  label: localState.label,
  extendClass: localState.extendClass,
}).render();

const subTitle = new Title({
  label: localState.subLabel,
}).render();

const link = new ButtonLink(localState.link).render();

const template = `
  ${title}
  ${subTitle}
  ${link}
`;

wrapper.insertAdjacentHTML(
  'afterbegin',
  template,
);

export default wrapper.outerHTML;