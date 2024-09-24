import { dayName, dayNumber } from '../dayname.mjs'

import assert from 'node:assert/strict'

describe('Test Suite for dayname module', function () {
  // Arrange
  it('should return Monday', function () {
    // Arrange

    // Act 
    const ret = dayName(1);

    // Assert
    assert.equal(ret, "Monday", "Should return Monday");
  });
  it('should return Tuesday', function () {
    // Arrange

    // Act 
    const ret = dayName(2);

    // Assert
    assert.equal(ret, "Tuesday", "Should return Tuesday");
  });
  it('for Monday should return 0', function () {
    // Arrange

    // Act 
    const ret = dayNumber("Sunday");

    // Assert
    assert.equal(ret, 0, "Should return 0");
  });
});