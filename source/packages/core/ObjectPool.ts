export class ObjectPool<T, A extends unknown[] = []> {

  constructor(
    private readonly creator: ObjectCreator<T, A>,
    private readonly setter: ObjectSetter<T, A>
  ) {}

  static of<T, A extends unknown[]>(type: {
    new (...args: A): T;
    set(instance: T, ...args: A): void;
  }) {
    return new ObjectPool<T, A>(
      (...args) => new type(...args),
      type.set.bind(type)
    );
  }

  return(instance: T) {
    this.cache.push(instance);
  }

  private readonly cache: T[] = [];

  claim(...args: A) {
    const cache = this.cache;
    if (cache.length > 0) {
      const instance = cache.pop()!;
      this.setter(instance, ...args);
      return instance;
    } else {
      return this.creator(...args);
    }
  }

}

export type ObjectCreator<T, A extends unknown[]> = (...args: A) => T;
export type ObjectSetter<T, A extends unknown[]> = (instance: T, ...args: A) => void;
