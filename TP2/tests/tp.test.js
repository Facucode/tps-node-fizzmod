// /* eslint-disable no-undef */
const { objectMerge, contador, cacheFunction } = require("../tp");

describe("Test objectMerge", () => {
  it("debería retornar el object merge en el tiempo especificado", async () => {
    const tiempoEnSegundos = 1;
    let ti = Date.now();
    let merge = await objectMerge(
      () => [
        { a: 1, b: 2 },
        { c: 1, d: 2 },
        { c: 11, b: 22 },
      ],
      () => tiempoEnSegundos
    );
    let t = Math.round((Date.now() - ti) / 1000);
    expect(t).toEqual(tiempoEnSegundos);
    expect(merge).toEqual({ a: 1, b: 22, c: 11, d: 2 });
  });
  it("en caso de error devolverá un string", async () => {
    try {
      await objectMerge(
        () => {},
        () => null
      );
      expect('').toEqual('Este test debería fallar');
    } catch (error) {
      expect(typeof error == "string").toBe(true);
    }
  });
  it("debe recibir un array válido", async () => {
    try {
      await objectMerge(
        () => {},
        () => 1
      );
      expect('').toEqual('Este test debería fallar');
    } catch (error) {
      expect(error).toBe("Array de entrada no válido");
    }
  });
  it("debe recibir un tiempo válido", async () => {
    try {
      await objectMerge(
        () => [{}],
        () => null
      );
      expect('').toEqual('Este test debería fallar');
    } catch (error) {
      expect(error).toBe("Tiempo de entrada no válido");
    }
  });
});

describe('Test contador', () => {
  it('debería retornar una función', () => {
    expect(typeof contador()).toBe('function');
  });
  it('deberia retornar 1 cuando la function retornada se llame', () => {
    expect(contador()()).toBe(1);
  });
  it('debería incrementar  y retornar un numbero cada vez que la función sea llamada', () => {
    const contadorFunction = contador();
    expect(contadorFunction()).toBe(1);
    expect(contadorFunction()).toBe(2);
    expect(contadorFunction()).toBe(3);
    expect(contadorFunction()).toBe(4);
    expect(contadorFunction()).toBe(5);
  });
 });

 describe('Test cacheFunction(cb)', function() {
  it('debería retornar una función', function() {
    const cb = function() {};
    expect(typeof cacheFunction(cb)).toEqual('function');
  });
  it('debería retornar el resultado de la función de callback', function() {
    const cb = function(x) {
      return x * 2;
    };
    const cachedFunction = cacheFunction(cb);
    expect(cachedFunction(5)).toBe(10);
  });
  it('La función debería cachear los resultados similares', function() {
    const cb = jest.fn();
    const cachedFunction = cacheFunction(cb);
    cachedFunction(true);
    cachedFunction(true);
    cachedFunction(true);
    cachedFunction(true);
    cachedFunction(true);
    cachedFunction(10);
    cachedFunction(10);
    cachedFunction(10);
    cachedFunction(10);
    expect(cb).toHaveBeenCalledTimes(2);
  });
 });
 
 