export default (): string => `
  <button
    type="{{ this.type }}"
    class="button"
    {{#if this.disabled }}
      disabled="{{ this.disabled }}"
    {{/if}}
    {{#if this.form }}
      form="{{ this.form }}"
    {{/if}}
  >
    {{ this.label }}
  </button>
`;