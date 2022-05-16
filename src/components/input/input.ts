import './index.scss';
import Block from '../../utils/Block';

interface InputProps {
  name: string;
  type: 'text' | 'password' | 'email' | 'tel';
  label?: string;
  isNotLabel?: boolean;
  hint?: boolean;
  hintDescription?: string;
  placeholder?: string;
  autocomplete?: string;
  disabled?: boolean;
  value?: string;
  onChange?: () => void;
}

export class Input extends Block {
  constructor({
    name,
    type= 'text',
    label = '',
    isNotLabel = false,
    hint = false,
    hintDescription = '',
    placeholder = '',
    autocomplete = 'off',
    disabled = false,
    value = '',
    onChange,
  }: InputProps) {
    super({
      name,
      type,
      label,
      isNotLabel,
      hint,
      hintDescription,
      placeholder,
      autocomplete,
      disabled,
      value,
      events: {
        input: onChange,
      },
    });
  }

  static getName(): string {
    return 'Input';
  }

  render(): string {
    // language=hbs
    return `
      <label class="input-field {{#if isNotLabel}}input-field__no-label{{/if}}">
        <span class="input-field__label">{{ label }}</span>
        <input
          class="input-field__input"
          type="{{ type }}"
          name="{{ name }}"
          placeholder="{{ placeholder }}"
          autocomplete="{{ autocomplete }}"
          {{#if disabled}}
            disabled="{{ disabled }}"
          {{/if}}
          {{#if value}}
            value="{{ value }}"
          {{/if}}
        >
        
        {{#if hint }}
          <span class="input-field__description input-field__description--hint">{{ hintDescription }}</span>
        {{/if}}
        <span class="input-field__description input-field__description--error"></span>
      </label>
    `
  }
}