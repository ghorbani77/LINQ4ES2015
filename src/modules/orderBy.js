'use strict';

import utils from './utils';
import asEnumerable from './asEnumerable';
import toArray from './toArray';
import OrderedEnumerable, {ProjectionComparer} from './OrderedEnumerable';

export default function* (source, keySelector, comparer) {
  //console.log('orderBy');
  if (this !== undefined && this !== null && arguments.length < 3 && source instanceof Function && source instanceof Function) {
    comparer = keySelector;
    keySelector = source;
    source = this;
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }
  
  if (keySelector == null || keySelector == undefined) {
    throw new Error('keySelector is null or undefined');
  }

  if (!(keySelector instanceof Function)) {
    throw new Error('keySelector must be a function');
  }

  if (!(comparer instanceof Function)) {
    comparer = (a, b) => {
      if (a > b) return 1;
      if (a == b) return 0;
      return -1;
    };
  }

  // let sortedResults = toArray(source).sort((a, b) => comparer(keySelector(a), keySelector(b)));
  // for (let index = 0; index < sortedResults.length; index++) {
  //   let element = sortedResults[index];
  //   yield element;
  // }


  source.orderedEnumerable = new OrderedEnumerable(source, new ProjectionComparer(keySelector, comparer));
  
  //console.log(source);

  let enumerable = source.orderedEnumerable.getEnumerator();
  let next = enumerable.next();
  while (!next.done) {
    yield next.value;
    next = enumerable.next();
  }
};