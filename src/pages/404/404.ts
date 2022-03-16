import Block from '../../utils/Block';

export class _404 extends Block {
  render(): string {
    return `
      <section>
        {{{
            Title
              label="404"
              extendClass="title--big"
        }}}
        {{{
            Title
              label="Не туда попали"
        }}}
        {{{
            Link
              label="Вернуться в чат"
              href=""
        }}}
      </section>
    `;
  }
}