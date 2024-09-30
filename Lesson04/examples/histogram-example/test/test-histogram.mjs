import { defHistogram } from '../histogram.mjs'

import assert from 'node:assert/strict'

describe('Test Suite for histogram module', function () {
  // Arrange
  const histogram = defHistogram();

  it('should return {} for a empty string', function () {
    // Arrange

    // Act 
    const ret = histogram("");

    // Assert
    assert.deepEqual(ret, {}, "Should return an empty object {}");
  });
  it("should return the object {'a': 2} for the string 'Aa'", function () {
    // Arrange

    // Act 
    const ret = histogram("Aa");

    // Assert
    assert.deepEqual(ret, {'a': 2}, "Should return the object {'a': 2}");
  });
  it("should return accumulated object {'a': 2, 'b': 2} for the string 'bB'", function () {
    // Arrange

    // Act 
    const ret = histogram("bB");

    // Assert
    assert.deepEqual(ret, {'a': 2, 'b': 2}, "Should return the object {'a': 2, 'b': 2}");
  });
});