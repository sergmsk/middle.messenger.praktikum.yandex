export default (): string => `
  <label class="input-field {{#if this.isNotLabel }}input-field__no-label{{/if}}">
    <span class="input-field__label">{{ this.label }}</span>
    <input
      class="input-field__input"
      type="{{ this.type }}"
      name="{{ this.name }}"
      placeholder="{{ this.placeholder }}"
      autocomplete="{{ this.autocomplete }}"
      {{#if this.disabled }}
        disabled="{{ this.disabled }}"
      {{/if}}
      {{#if this.value }}
        value="{{ this.value }}"
      {{/if}}
    >
    
    {{#if this.hint }}
      <span class="input-field__description input-field__description--hint">{{ this.hintDescription }}</span>
    {{/if}}
    <span class="input-field__description input-field__description--error"></span>
  </label>
`;