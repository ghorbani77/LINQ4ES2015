'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';

export default function* (source, count) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    count = source;
    source = this;
  }

  if (source == null || source == undefined) {
    throw new Error('source is null or undefined');
  }
  if (count == null || count == undefined) {
    throw new Error('count is null or undefined');
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }
  if(typeof count !== 'number'){
    throw new Error('count must be a number');
  }

  let next = source.next();
  let cnt = 0;
  while (true) {
    yield next.value;
    if (++cnt >= count) {
      break;
    }
    next = source.next();
  }
};