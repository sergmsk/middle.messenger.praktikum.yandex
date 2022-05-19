import Handlebars from 'handlebars';
import { nanoid } from 'nanoid';

import EventBus from './EventBus';
import { Nullable, Values, Props, PropsOrUndefined } from './types';

type Events = Values<typeof Block.EVENTS>;

export default class Block<P = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);
  _meta: {
    props: PropsOrUndefined;
  };

  _element: Nullable<HTMLElement> = null;
  props: PropsOrUndefined;
  children: { [id: string]: Block } = {};

  eventBus: () => EventBus<Events>;

  state: PropsOrUndefined = {};
  refs: { [key: string]: HTMLElement } = {};

  public constructor(props?: PropsOrUndefined) {
    const eventBus = new EventBus<Events>();

    this._meta = {
      props,
    };

    this.getStateFromProps(props);

    this.props = this._makePropsProxy(props || {} as PropsOrUndefined);
    this.state = this._makePropsProxy(this.state);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT, this.props);
  }

  _registerEvents(eventBus: EventBus<Events>): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources(): void {
    this._element = this._createDocumentElement('div');
  }

  getStateFromProps(props: PropsOrUndefined): void {
    this.props = props;
    this.state = {};
  }

  init(): void {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER, this.props);
  }

  _componentDidMount(props: P): void {
    this.componentDidMount(props);
  }

  componentDidMount(props: P): void {
    this.props = props;
  }

  _componentDidUpdate(oldProps: P, newProps: P): void {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate(oldProps: P, newProps: P): boolean {
    console.log(oldProps);
    console.log(newProps);
    return true;
  }

  setProps = (nextProps: P): void => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setState = (nextState: P): void => {
    if (!nextState) {
      return;
    }

    Object.assign(this.state, nextState);
  };

  get element(): any {
    return this._element;
  }

  _render(): void {
    const fragment = this._compile();

    this._removeEvents();
    const newElement = fragment.firstElementChild as HTMLElement;

    this._element!.replaceWith(newElement);

    this._element = newElement as HTMLElement;
    this._addEvents();
  }

  render(): string {
    return '';
  }

  getContent(): HTMLElement {
    // Хак, чтобы вызвать CDM только после добавления в DOM
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100)
    }

    return this.element as HTMLElement;
  }

  _makePropsProxy(props: PropsOrUndefined): any {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props as Props, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в след итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    }) as unknown as P;
  }

  _createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  _removeEvents(): void {
    const events: Record<string, () => void> = (this.props as PropsOrUndefined)!.events;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]: [string, EventListener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents(): void {
    const events: Record<string, () => void> = (this.props as PropsOrUndefined)!.events;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]: [string, EventListener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  _compile(): DocumentFragment {
    const fragment = document.createElement('template');

    /**
     * Рендерим шаблон
     */
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template({ ...this.state, ...this.props, children: this.children, refs: this.refs });

    /**
     * Заменяем заглушки на компоненты
     */
    Object.entries(this.children).forEach(([id, component]: [string, Block]) => {
      /**
       * Ищем заглушку по id
       */
      const stub = fragment.content.querySelector(`[data-id="${id}"]`);

      if (!stub) {
        return;
      }

      /**
       * Заменяем заглушку на component._element
       */
      stub.replaceWith(component.getContent());
    });


    /**
     * Возвращаем фрагмент
     */
    return fragment.content;
  }

  show(): void {
    this.getContent().style.display = 'block';
  }

  hide(): void {
    this.getContent().style.display = 'none';
  }
}