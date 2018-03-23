/* eslint-disable no-undef */
import axios from 'axios';
import { setupXhrFakeServer } from '../src/xhr';
import { clearTestValues, createNewTestValue } from '../src/helpers';

setupXhrFakeServer();

test('Fake axios success  with code 200', (done) => {
  // clear old test values
  clearTestValues();

  // create a new test value
  createNewTestValue({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts',
    response: { hello: 'world' },
    code: 200,
    timeout: 1,
  });

  // call the url specified in the test value
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      // expect a same code as in the test value
      expect(response.status).toBe(200);
      // expect response to match the test response
      expect(response.data.hello).toBe('world');
      done();
    });
});


test('Fake axios rejects with code 404 ', (done) => {
  // clear old test values
  clearTestValues();

  // create a new test value with code 404 so it should reject
  createNewTestValue({
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts',
    response: '404',
    code: 404,
    timeout: 25,
  });

  // call the test url with the test method and expect rejection
  axios.get('https://jsonplaceholder.typicode.com/posts')
    .catch((err) => {
      // make sure the axios message to appear
      expect(err.message).toBe('Request failed with status code 404');
      done();
    });
});
