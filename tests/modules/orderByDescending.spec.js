/* global describe, it, expect, spyOn, jasmine */

"use strict";

import linq from "../../src/linq";
import toArray from "../../src/modules/toArray";
import orderByDescending from "../../src/modules/orderByDescending";

describe("orderByDescending", () => {

	let simpleArr = [3, 2, 6, 4];
	let complexArr = [{ FirstName: 'C' }, { FirstName: 'A' }, { FirstName: 'B' }];

	it("must retrn ordered items", () => {
		let orderedItems = simpleArr.asEnumerable().orderByDescending(num => num).toArray();
		expect(orderedItems.length).toBe(4);
		expect(orderedItems[0]).toBe(6);
		expect(orderedItems[1]).toBe(4);
		expect(orderedItems[2]).toBe(3);
		expect(orderedItems[3]).toBe(2);
	});

	it("must retrn ordered set of complex items", () => {
		let orderedItems = complexArr.asEnumerable().orderByDescending(item => item.FirstName).toArray();
		expect(orderedItems.length).toBe(3);
		expect(orderedItems[0].FirstName).toBe('C');
		expect(orderedItems[1].FirstName).toBe('B');
		expect(orderedItems[2].FirstName).toBe('A');
	});

	it("must call order by descending function correctly because of where method", () => {
		let fakeObject = { fakeorderByDescending: num => num };
		spyOn(fakeObject, 'fakeorderByDescending').and.callThrough();
		let result = simpleArr.asEnumerable().where(num => num % 2 == 0).orderByDescending(fakeObject.fakeorderByDescending).toArray();
		expect(fakeObject.fakeorderByDescending).toHaveBeenCalledWith(2);
		expect(fakeObject.fakeorderByDescending).toHaveBeenCalledWith(4);
		expect(fakeObject.fakeorderByDescending).toHaveBeenCalledWith(6);
		expect(fakeObject.fakeorderByDescending).not.toHaveBeenCalledWith(3);
		expect(fakeObject.fakeorderByDescending.calls.count()).toBe(6);
		expect(result[0]).toBe(6);
		expect(result[1]).toBe(4);
		expect(result[2]).toBe(2);
		expect(result.length).toBe(3);
	});

	it("must call order by descending function correctly because of take method", () => {
		let fakeObject = { fakeorderByDescending: num => num };
		spyOn(fakeObject, 'fakeorderByDescending').and.callThrough();
		let result = simpleArr.asEnumerable().take(2).orderByDescending(fakeObject.fakeorderByDescending).toArray();
		expect(fakeObject.fakeorderByDescending).toHaveBeenCalledWith(3);
		expect(fakeObject.fakeorderByDescending).toHaveBeenCalledWith(2);
		expect(fakeObject.fakeorderByDescending).not.toHaveBeenCalledWith(6);
		expect(fakeObject.fakeorderByDescending).not.toHaveBeenCalledWith(4);
		expect(fakeObject.fakeorderByDescending.calls.count()).toBe(2);
		expect(result[0]).toBe(3);
		expect(result[1]).toBe(2);
		expect(result.length).toBe(2);
	});

	it("must throws an exception when the source is null or undefined", () => {
		expect(() => toArray(orderByDescending(null, item => item))).toThrowError("source is null or undefined");
		expect(() => toArray(orderByDescending(undefined, item => item))).toThrowError("source is null or undefined");
	});

	it("must throws an exception when the source is not an enumerable", () => {
		expect(() => toArray(orderByDescending({}, item => item))).toThrowError("source must be an enumerable");
	});

	it("must throws an exception when the order descending by column is not a function", () => {
		expect(() => toArray(orderByDescending([], {}))).toThrowError("order by descending column must be a function");
	});
});