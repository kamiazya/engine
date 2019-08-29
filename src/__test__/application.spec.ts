import { Injector, ReflectiveInjector } from 'injection-js';
import { INITIALIZER, TERMINATER, Application } from '../application';

describe('Application', () => {
  it('Can be instantiated', () => {
    const injector: Injector = ReflectiveInjector.resolveAndCreate([Application]);

    const app = injector.get<Application>(Application);

    expect(app).toBeInstanceOf(Application);
  });

  it('Application initialization', async () => {
    let a: number = 0;
    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      Application,
      {
        multi: true,
        provide: INITIALIZER,
        useValue: async () => a++,
      },
      {
        multi: true,
        provide: INITIALIZER,
        useValue: async () => (a += 3),
      },
    ]);

    const app = injector.get<Application>(Application);
    await app.initialize();
    expect(a).toEqual(4);
  });

  it('Application termination', async () => {
    let a: number = 0;
    const injector: Injector = ReflectiveInjector.resolveAndCreate([
      Application,
      {
        multi: true,
        provide: TERMINATER,
        useValue: async () => (a = 100),
      },
      {
        multi: true,
        provide: TERMINATER,
        useValue: async () => (a += 50),
      },
    ]);

    const app = injector.get<Application>(Application);
    await app.terminate();
    expect(a).toEqual(150);
  });
});
