'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function* (first, second, comparer) {
  if (this !== undefined && this !== null && arguments.length < 3 && (!second || second instanceof Function)) {
    comparer = second;
    second = first;
    first = this;
  }
  
  if (first == null || first == undefined) {
    throw new Error('first is null or undefined');
  }
  if (second == null || second == undefined) {
    throw new Error('second is null or undefined');
  }
  
  if (!utils.isGenerator(first)) {
    first = asEnumerable(first);
  }
  if (!utils.isGenerator(second)) {
    second = asEnumerable(second);
  }

  if (!utils.isFunc(comparer)) {
    comparer = (a, b) => a == b;
  }

  let result = [];
  let next = first.next();
  while (!next.done) {
    if (utils.safePush(result, next.value, comparer)) {
      yield next.value;
    }
    next = first.next();
  }
  next = second.next();
  while (!next.done) {
    if (utils.safePush(result, next.value, comparer)) {
      yield next.value;
    }
    next = second.next();
  }
};