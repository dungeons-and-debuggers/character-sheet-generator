export const trueTypeOf = (item) => Object.prototype.toString.call(item).slice(8, -1);
export const isArray = (item) => trueTypeOf(item) === 'Array';
export const isFunction = (item) => trueTypeOf(item) === 'Function';
export const isObject = (item) => trueTypeOf(item) === 'Object';
