/**
 * @jest-environment jsdom
 */
import Block from './Block';

class TestPage extends Block {
  constructor() {
    super();
  }

  render() {
    return '';
  }
}

describe('Router', () => {
  const history = window.history;
  let TestRouter: any;
  beforeAll(() => {
    Object.defineProperty(window, 'history', {});
  });

  beforeEach(() => {
    TestRouter = require('./Router').default;
    TestRouter = new TestRouter();
  });

  afterEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    Object.defineProperty(window, 'history', history);
  });

  it('Add Route', () => {
    TestRouter.use('/', TestPage);

    expect(TestRouter.routes).toHaveLength(1);
  });

  it('adds BeforeEach hook', () => {
    TestRouter.use('/', TestPage);
    const route = TestRouter.getRoute('/');

    expect(route).toBeTruthy();
  });
});