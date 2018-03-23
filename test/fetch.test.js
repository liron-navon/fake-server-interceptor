/* eslint-disable no-undef */
import { createNewTestValue } from '../src/helpers';
import { setupFetchFakeServer } from '../src/fetch';

setupFetchFakeServer(); // TODO: add a test for fetch to fail properly

test('Fake fetch success with code 200', (done) => {

  // create a new test value with a real live url (typicode are awsome, go check them out!)
  createNewTestValue({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts',
    response: { hello: 'world' },
    code: 200,
    timeout: 1,
  });

  // use fetch to retrieve data
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      // make sure the status is ok, and the response.json() should work properly
      expect(response.status).toBe(200);
      expect(response.json).not.toBe(undefined);
      return response.json();
    })
    .then((myJson) => {
      // make sure out test values were passed properly
      expect(myJson.hello).toBe('world');
    }).then(() => done());
});

