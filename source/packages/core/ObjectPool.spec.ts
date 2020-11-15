import { ObjectPool } from "./ObjectPool";

describe("core.ObjectPool class", () => {

  class SampleClass {

    constructor(public string: string, public number: number) {}

    static set(instance: SampleClass, a: string, b: number) {
      instance.string = a;
      instance.number = b;
    }

  }

  test("Should create if the cache is empty.", () => {

    const pool = ObjectPool.of(SampleClass);
    const claimed = pool.claim("initial", 123);

    expect(claimed.string).toStrictEqual("initial");
    expect(claimed.number).toStrictEqual(123);

    expect(claimed).toBeInstanceOf(SampleClass);

  });

  test("Should reuse if the cache is not empty.", () => {

    const pool = ObjectPool.of(SampleClass);
    const a = pool.claim("initial", 123);

    pool.return(a);

    const b = pool.claim("second", 321);

    expect(b).toStrictEqual(a);

    expect(b.string).toStrictEqual("second");
    expect(b.number).toStrictEqual(321);

  });

  test("Should not reuse a claimed instance.", () => {

    const pool = ObjectPool.of(SampleClass);
    const a = pool.claim("initial", 123);

    pool.return(a);

    const b = pool.claim("second", 321);
    const c = pool.claim("third", 654);

    expect(b).toStrictEqual(a);
    
    expect(b.string).toStrictEqual("second");
    expect(b.number).toStrictEqual(321);

    expect(b).not.toStrictEqual(c);

    expect(c.string).toStrictEqual("third");
    expect(c.number).toStrictEqual(654);


  });

});