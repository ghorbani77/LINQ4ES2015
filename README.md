# LINQ4ES2015
Language Integrated Query for JavaScript based on ECMA Script 2015

**Getting started:**

    jspm install

Sample usage:

	let result = [0, 1, 2, 2, 3, 4, 5, 6, 7, 8, 9].asEnumerable()
		.where(num => num % 2 == 0)
		.take(3)
		.orderByDescending(num => num)
		.select(num => '[' + num + ']')
    .distinct()
		.toArray();

Result will be ['[2]', '[0]'] and where predicate will be executed only 4 times.

Supported methods:
* Aggregate
* All
* Any
* AsEnumerable
* Average
* Concat
* Contains
* Count
* DefaultIfEmpty
* Distinct
* Empty
* Except
* First
* FirstOrDefault
* Intersect
* Last
* LastOrDefault
* Max
* Min
* OrderBy
* OrderByDescending
* Range
* Repeat
* Select
* SelectMany
* SequenceEquals
* Single
* SingleOrDefault
* Sum
* Take
* ToArray
* Union
* Where

In Progress Methods:
* Join
* GroupBy
* GroupJoin
* TakeWhile
* SkipWhile
* Skip
* ThenBy
* ThenByDescending
* Reverse
* ElementAt
* ElementAtOrDefault
* Zip
	
Contributions are welcomed.
