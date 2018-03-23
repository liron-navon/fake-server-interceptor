/* eslint-disable no-undef */
import fakeServer from 'fake-server-interceptor';

const ApiService = {
  get: url => fetch(url, { method: 'get' }),
};

// initialize the test server, no need to call this more then once
fakeServer.init();

afterEach(() => {
  // clear the test data
  fakeServer.clear();
});

test('ApiService work as expected with fetch', () => {
  fakeServer.set({
    /*
    Running the call will return 100 placeholder posts from jsonplaceholder.typicode.com,
    but we don't want to make this call when testing
     */
    url: 'https://jsonplaceholder.typicode.com/posts',
    /*
    Instead of making a real http call, xhr and fetch will return this test response
    it will also work with any library that creates an abstruction over them like axios and got
    */
    response: { hello: 'world' },
  });

  // call the same url with the same method we set
  ApiService.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      const json = response.json();
      expect(json.hello).toBe('world');
    });
});
