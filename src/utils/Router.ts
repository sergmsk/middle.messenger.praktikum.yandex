import Block from './Block';
import { Props } from './types';

class Route {
  private pathname: string;
  private blockClass: typeof Block;
  private block: Block | null;
  private props: Props;

  constructor(pathname: string, view: typeof Block, props: Props) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this.block) {
      this.block.getContent().remove();
    }
  }

  match(pathname: string): boolean {
    return pathname === this.pathname;
  }

  render(): void {
    if (!this.block) {
      this.block = new this.blockClass();
    }

    const root = document.querySelector(this.props.rootQuery);

    if (!root) {
      throw new Error('Root not found');
    }

    root.innerHTML = '';
    root.appendChild(this.block.getContent());
  }
}

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history = window.history;
  private currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block): Router {
    const route = new Route(pathname, block, { rootQuery: '#root' });

    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (!route) {
      this.go('/404');
      return;
    }

    if (this.currentRoute) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;

    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }
}

export default Router;

export function withRouter(Component: typeof Block): any {
  return class WithRouter extends Component {
    constructor(props: Props) {
      const router = new Router();

      super({...props, router: router});
    }
  }
}