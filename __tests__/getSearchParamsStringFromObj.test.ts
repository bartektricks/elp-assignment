import getSearchParamsStringFromObj from '~/utils/getSearchParamsStringFromObj';

describe('getSearchParamsStringFromObj', () => {
  it('should return an empty string if the object is empty', () => {
    const obj = {};
    const result = getSearchParamsStringFromObj(obj);
    expect(result).toBe('');
  });

  it('should return a search parameter string with a single key-value pair', () => {
    const obj = { key: 'value' };
    const result = getSearchParamsStringFromObj(obj);
    expect(result).toBe('?key=value');
  });

  it('should return a search parameter string with multiple key-value pairs', () => {
    const obj = { key1: 'value1', key2: 'value2', key3: 'value3' };
    const result = getSearchParamsStringFromObj(obj);
    expect(result).toBe('?key1=value1&key2=value2&key3=value3');
  });

  it('should ignore null and undefined values', () => {
    const obj = { key1: 'value1', key2: null, key3: undefined };
    const result = getSearchParamsStringFromObj(obj);
    expect(result).toBe('?key1=value1');
  });

  it('should convert number values to strings', () => {
    const obj = { key: 123 };
    const result = getSearchParamsStringFromObj(obj);
    expect(result).toBe('?key=123');
  });
});
