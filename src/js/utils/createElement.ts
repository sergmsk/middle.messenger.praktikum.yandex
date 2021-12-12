export default (tag = 'div', id: string | null = null, classes: string[] = []): HTMLElement => {
  const element = document.createElement(tag);

  if (id) {
    element.setAttribute('id', id);
  }

  if (classes.length) {
    classes.forEach(className => element.classList.add(className));
  }

  return element;
}