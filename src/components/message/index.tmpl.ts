export default (): string => `
  <div class="message {{#if this.isMyMessage }}message--my{{/if}}">
    {{#if this.content }}
      <p class="message__text">{{ this.content }}</p>
    {{/if}}
    {{#if this.img }}
      <img class="message__image" src="{{ this.img }}" alt="image">
    {{/if}}
    <div class="message__date">{{ this.time }}</div>
  </div>
`;