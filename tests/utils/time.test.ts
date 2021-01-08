import timeUtils from '../../utils/time';

describe('getTime function', () => {
  test('Returns a string', () => {
    const time = timeUtils.getTime();
  
    expect(typeof time).toEqual('string');
  });
  
  test('Returns a UTC ISO string', () => {
    const time = timeUtils.getTime();
  
    const dateObject = new Date(time).getTime();
  
    expect(dateObject).not.toBeNaN();
  });
});

describe('getNumberOfMillisecondsUntilEndOfDay function', () => {
  test('Returns the correct number of ms until the end of the day', () => {
    const now = timeUtils.utc().valueOf();
    const endOfDay = timeUtils.utc().endOf('day').valueOf();

    // Difference
    const expectedMsUntilEndOfDay = endOfDay - now;

    const generatedMsUntilEndOfDay = timeUtils.getNumberOfMillisecondsUntilEndOfDay();

    // Expect the difference in ms between the expected and generated times to be less than or equal to 1ms. 
    //
    // There will always be a difference between expected and generated, but it should not be more than 1 ms.
    expect(Math.abs(generatedMsUntilEndOfDay - expectedMsUntilEndOfDay)).toBeLessThanOrEqual(1);
  });
});
