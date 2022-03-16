/**
 * Проверяем на пустоту
 * @param value
 * @returns {boolean}
 */
export default (value: unknown[] | Record<string, unknown> | number | boolean | null): boolean => {
  const isArray = Array.isArray(value);
  const isObject = typeof value === 'object';
  const isNumber = typeof value === 'number';
  const isBoolean = typeof value === 'boolean';
  const isNull = value === null;

  if (isNull || isNumber || isBoolean) {
    return true;
  }

  if (isArray) {
    return !value.length;
  }

  if (isObject) {
    return !(value?.size || Object.keys(value).length);
  }

  return !value;
};