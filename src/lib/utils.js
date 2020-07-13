export const noop = () => {};

export const isEmptyObject = value => {
  // eslint-disable-next-line no-eq-null
  if (value == null) {
    return true;
  }
  return Object.keys(value).length === 0 && value.constructor === Object;
};
