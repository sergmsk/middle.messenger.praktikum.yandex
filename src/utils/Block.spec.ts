/**
 * @jest-environment jsdom
 */
import Block from './Block';

class TestBlock extends Block {
  constructor(props: Record<string, unknown>) {
    super(props);
  }

  componentShouldUpdate() {
    return true;
  }

  render() {
    return '';
  }
}

describe('Block', () => {
  const createInstance = (props: Record<string, unknown>) => new TestBlock(props);

  it('checking props on constructor', () => {
    const props = { test: 'test' };

    const instance = createInstance(props);

    expect(instance.props).toEqual(props);
  });

  it('check uniq id', () => {
    const props = { test: 'test' };

    const instance = createInstance(props);

    expect(typeof instance.id).toBe('string');
  });
});