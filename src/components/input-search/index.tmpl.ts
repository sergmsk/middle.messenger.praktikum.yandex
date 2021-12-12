export default (): string => `
  <input
    class="input-search"
    type="{{ this.type }}"
    name="{{ this.name }}"
    placeholder="{{ this.placeholder }}"
    autocomplete="{{ this.autocomplete }}"
    {{#if this.value }}
    value="{{ this.value }}"
    {{/if}}
  >
`;