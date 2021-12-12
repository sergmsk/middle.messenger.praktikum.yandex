export default (): string => `
  <form id="{{ formName }}" name="{{ formName }}" class="form-profile">
    <section class="form-profile__fields">
      {{ inputs }}
    </section>
  </form>
`;