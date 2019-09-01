import { Provider, Type } from 'injection-js';
import 'reflect-metadata';

/**
 * Interface defining a Dynamic Module.
 */
export interface IDynamicModule extends IModuleMetadata {
  /**
   * A module
   */
  module: Type<any>;
}

/**
 * Interface defining the property object that describes the module.
 */
export interface IModuleMetadata {
  /**
   * Optional list of imported modules that export the providers which are
   * required in this module.
   */
  imports?: Array<IDynamicModule | Promise<IDynamicModule>>;

  /**
   * Optional list of providers that will be instantiated by the Nest injector
   * and that may be shared at least across this module.
   */
  providers?: Provider[];

  /**
   * Optional list of the subset of providers that are provided by this module
   * and should be available in other modules which import this module.
   */
  exports?: Array<
    | IDynamicModule
    | Promise<IDynamicModule>
    | Provider
  >;
}

export function Module(metadata: IModuleMetadata): ClassDecorator {
  return (target: object) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (metadata as any)[property], target);
      }
    }
  };
}
