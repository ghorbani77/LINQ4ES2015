'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function (source, seed, func, resultSelector) {
  if (this !== undefined && this !== null && arguments.length < 4) {
    resultSelector = func;
    func = seed;
    seed = source;
    source = this;
  }

  if (source == null || source == undefined) {
    throw new Error('source is null or undefined');
  }
  if (func == null || func == undefined) {
    throw new Error('func is null or undefined');
  }

  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }
  if (!(func instanceof Function)) {
    throw new Error('func must be a Function');
  }
  if (!(resultSelector instanceof Function)) {
    resultSelector = undefined;
  }
  if (!resultSelector) {
    resultSelector = a => a;
  }

  let next = source.next();
  let current = seed;
  while (!next.done) {
    current = func(current, next.value);
    next = source.next();
  }
  return resultSelector(current);
};