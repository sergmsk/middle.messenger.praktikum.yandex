export default (): string => `
  <a class="button-link {{ this.extendClass }}" href="/{{this.href}}">{{ this.label }}</a>
`;