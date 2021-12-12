export default (): string => `
  <form id="{{ formName }}" name="{{ formName }}" class="form">
    <section class="form__fields">
      {{ inputs }}
    </section>
    <section class="form__controls">
      {{ buttons }}
    </section>
  </form>
`;