export default (): string => `
  <button type="button" class="chat">
    <div class="chat__avatar">
      {{#if this.avatar }}
        <img src="{{ this.avatar }}" alt="avatar">
      {{else}}
        <div class="chat__avatar-default"></div>
      {{/if}}
    </div>
    <div class="chat__info">
      <h3 class="chat__title">{{ this.title }}</h3>
      <p class="chat__text">
        {{#if this.isMyLastMessage }}
          Вы:
        {{/if}}
        {{ this.last_message.content }}
      </p>
    </div>
    <div class="chat__info">
      <span class="chat__date">{{ this.time }}</span>
      {{#if this.unread_count }}
        <div class="chat__notification-wrapper">
          <span class="chat__notification">{{ this.unread_count }}</span>
        </div>
      {{/if}}
    </div>
  </button>
`;