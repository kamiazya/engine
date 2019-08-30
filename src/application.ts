import { Injectable, InjectionToken, Injector } from 'injection-js';

type LifeCycleFunction = () => Promise<void>;

export const INITIALIZER = new InjectionToken<LifeCycleFunction>('application.life-cycle.initializer');
export const TERMINATER = new InjectionToken<LifeCycleFunction>('application.life-cycle.terminater');

@Injectable()
export class Application {
  constructor(private injector: Injector) {}

  /**
   * Inisializa application.
   */
  public async initialize(): Promise<void> {
    return this.excute(INITIALIZER);
  }

  /**
   * Terminate application.
   */
  public async terminate(): Promise<void> {
    return this.excute(TERMINATER);
  }

  /**
   * Execute the specified life cycle process.
   */
  private async excute(token: InjectionToken<LifeCycleFunction>): Promise<void> {
    const functions = this.injector.get<LifeCycleFunction[]>(token, []);
    await Promise.all(functions.map(f => f()));
  }
}
