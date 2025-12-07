export const flattenObject = (obj, prefix = '') => {
  return Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      !Array.isArray(obj[k])
    ) {
      Object.assign(acc, flattenObject(obj[k], pre + k));
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
};

export const getAvailablePaths = (json) => {
  const flattened = flattenObject(json);
  return Object.keys(flattened).map((key) => ({
    path: key,
    value: flattened[key],
    type: typeof flattened[key],
  }));
};
