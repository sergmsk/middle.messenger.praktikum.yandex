import EventBus from './EventBus';
import { Props } from './types';

export interface Action {
  type: string;
  payload?: any;
}

type Reducer<S = any> = (state: S, action: Action) => S;

export class Store extends EventBus {
  private state: Props = {};
  private reducer: Reducer;

  constructor(reducers: Props) {
    super();

    this.reducer = this.combineReducers(reducers);

    this.dispatch({ type: '@@INIT' });
  }

  public dispatch(action: Action): void {
    this.state = this.reducer(this.state, action);

    this.emit('changed');
  }

  public getState(): Props {
    return this.state;
  }

  private combineReducers(reducers: Props): Reducer {
    return (_state: any, action: Action) => {
      const newState: Props = {};

      Object.entries(reducers).forEach(([key, reducer]) => {
        newState[key] = reducer(this.state[key], action);
      });

      return newState;
    }
  }
}