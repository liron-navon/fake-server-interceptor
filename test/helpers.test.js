/* eslint-disable no-undef */
import { createKey, createNewTestValue, clearTestValues } from '../src/helpers';
import { urlMapper } from '../src/urlsMapper';

const TEST_URL = '/test/foo/buzz';
const TEST_RESPONSE = 'OK';
const TEST_METHOD = 'GET';

// a helper to create the simplest test value
const createSimpleTestValue = () => createNewTestValue({
  method: TEST_METHOD,
  url: TEST_URL,
  response: TEST_RESPONSE,
  code: 200,
  timeout: 1,
});

test('createKey works as expected, and ignore method casing', () => {
  // create keys with different methods
  const key1 = createKey(TEST_URL, 'get');
  const key2 = createKey(TEST_URL, 'GET');
  const key3 = createKey(TEST_URL, 'post');

  // expect different method casing to not effect test
  expect(key1).toBe(key2);
  // expect different methods to produce different keys
  expect(key1).not.toBe(key3);
});

test('createNewTestValue can create new test values', () => {
  clearTestValues();
  expect(Object.keys(urlMapper).length).toBe(0);

  createSimpleTestValue();

  // make sure we created a test value
  expect(Object.keys(urlMapper).length).toBe(1);

  // create a key to match the test value
  const key = createKey(TEST_URL, TEST_METHOD);

  // make sure a test value with the test key and the test response was created
  expect(urlMapper[key].response).toBe(TEST_RESPONSE);
});

test('createNewTestValue can override old test values with the same url and methods', () => {
  clearTestValues();
  expect(Object.keys(urlMapper).length).toBe(0);

  // create a simple test value and make sure it was created properly
  createSimpleTestValue();
  const key = createKey(TEST_URL, TEST_METHOD);
  expect(Object.keys(urlMapper).length).toBe(1);
  expect(urlMapper[key].response).toBe(TEST_RESPONSE);

  // create a new test value with different response and same method and url
  createNewTestValue({
    method: TEST_METHOD,
    url: TEST_URL,
    response: 'BUZZ',
    code: 200,
    timeout: 1,
  });

  // make sure the new test value override the old one
  expect(Object.keys(urlMapper).length).toBe(1);
  expect(urlMapper[key].response).toBe('BUZZ');
});


test('clearTestValues can clear the urlMapper', () => {
  // create a new test value to and make sure something was created
  createSimpleTestValue();
  expect(Object.keys(urlMapper).length > 0).toBe(true);

  // clear the mapper and make sure no test values are left
  clearTestValues();
  expect(Object.keys(urlMapper).length).toBe(0);
});

