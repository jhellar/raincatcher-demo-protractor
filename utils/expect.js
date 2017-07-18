/**
 * Expect result is equal to actual value
 * @param {*} actual result
 * @param {*} expected expected result
 */
module.exports.resultIsEquelTo = function(actual, expected) {
  expect(actual).to.equal(expected);
};

/**
 * Expect result is not equal to actual value
 * @param {*} actual result
 * @param {*} expected expected result
 */
module.exports.resultIsNotEquelTo = function(actual, expected) {
  expect(actual).to.not.equal(expected);
};

/**
 * Expect result to be true
 * @param {*} result
 */
module.exports.resultIsTrue = function(result) {
  expect(result).to.be.true;
};

/**
 * Expect result to be false
 * @param {*} result
 */
module.exports.resultIsFalse = function(result) {
  expect(result).to.be.false;
};

/**
 * Expect result to be null
 * @param {*} result
 */
module.exports.resultIsNull = function(result) {
  expect(result).to.be.null;
};

/**
 * Expect result to be null
 * @param {*} result
 */
module.exports.resultIsUndefined = function(result) {
  expect(result).to.be.undefined;
};

/**
 * Expect each result of an operation should be true
 * @param {*} results
 */
module.exports.eachResultsIsTrue = function(results) {
  results.forEach(function(result) {
    expect(result).to.be.true;
  });
};

/**
 * Expect each result of an operation should be false
 * @param {*} results
 */
module.exports.eachResultsIsFalse = function(results) {
  results.forEach(function(result) {
    expect(result).to.be.false;
  });
};

/**
 * Expect each result of an operation should be null
 * @param {*} elements
 */
module.exports.eachResultsIsNull = function(results) {
  results.forEach(function(result) {
    expect(result).to.be.null;
  });
};