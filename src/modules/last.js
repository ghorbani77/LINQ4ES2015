"use strict";

import utils from "./utils";
import asEnumerable from "./asEnumerable";

export default function (source, predicate) {
  if (this !== undefined && this !== null && arguments.length < 2) {
    predicate = source;
    source = this;
  }
  
  if (source == null || source == undefined) {
    throw new Error("source is null or undefined");
  }
  
  if (Array.isArray(source)) {
    if (!predicate) {
      if (source.length === 0) {
        throw new Error("Sequence contains no elements");
      }
      return source[source.length - 1];
    }
  }
  
  if (!utils.isGenerator(source)) {
    source = asEnumerable(source);
  }

  if (!(predicate instanceof Function)) {
    predicate = undefined;
  }

  let next = source.next();
  if (next.done) {
    throw new Error("Sequence contains no elements");
  }

  let last = null;
  if (!predicate) {
    while (!next.done) {
      last = next.value;
      next = source.next();
    }
    return last;
  }

  let found = false;
  while (!next.done) {
    if (predicate(next.value)) {
      found = true;
      last = next.value;
    }
    next = source.next();
  }
  if (!found) {
    throw new Error("Sequence contains no matching element");
  }
  return last;
};