export const bound = ((
  prototype: object,
  name: symbol | string | number
) => {

  // TODO: Reflect.get() ponyfill
  const method = Reflect.get(prototype, name);

  if (typeof method !== "function")
    throw new Error("@bound can only be applied to method declarations.");

  return {
    configurable: true,
    enumerable: false,
    get(this: object) {

      const bound = method.bind(this);

      Object.defineProperty(this, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: bound
      });

      return bound;

    }
  };

}) as MethodDecorator;