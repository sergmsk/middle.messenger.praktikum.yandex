import Handlebars from "handlebars/dist/handlebars";

import EventBus from "./eventBus";

export default class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };

  eventBus: () => EventBus;

  _element: HTMLElement | Record<string, unknown>;

  _meta: {
    tagName: string,
    props: Record<string, unknown>,
  };

  props: {
    [key: string]: unknown,
  };

  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources(): void {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount(): void {
    // this.componentDidMount();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // componentDidMount(oldProps) {}

  _componentDidUpdate(oldProps: { [key: string]: unknown }, newProps: { [key: string]: unknown }): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: { [key: string]: unknown }, newProps: { [key: string]: unknown }): boolean {
    // TODO: Правильно сравнить объекты
    return oldProps === newProps || true;
  }

  setProps = (nextProps: unknown): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement | Record<string, unknown> {
    return this._element;
  }

  _render(): void {
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напиши свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы превращать из возвращать из compile DOM-ноду
    this._element.innerHTML = this.render() as unknown as string;
  }

  // eslint-disable-next-line
  render() {}

  _compile(template: string, props: { [key: string]: unknown }): string {
    return Handlebars.compile(template, { noEscape: true })(props);
  }

  getContent(): HTMLElement | Record<string, unknown> {
    return this.element;
  }

  _makePropsProxy(props: { [key: string]: unknown }): Record<string, unknown> {
    return new Proxy(props, {
      get(target: { [key: string]: unknown }, prop: string) {
        const value: unknown = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target: { [key: string]: unknown }, prop: string, value: unknown) => {
        target[prop] = value;
        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создает сразу несколько блоков
    return document.createElement(tagName);
  }
}