# Fake-Server-Interceptor

A testing utility to test http calls, it will override fetch and XMLHttpRequest with specified test values for each call:

First we create some http abstruction
```javascript
const ApiService = {
  get: (url) => {
    return fetch(url, {method: 'get' })
  }
}
```

Then, we want to test our abstraction.
This example uses jest as the assertion library and test runner
```javascript  
import fakeServer from 'fake-server-interceptor';

// initialize the test server, no need to call this more then once
fakeServer.init();
  
afterEach(() => {
  // clear the test data
  fakeServer.clear();
});
  
test('ApiService work as expected', () => {
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
  })
    
  // call the same url with the same method we set
  ApiService.get('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
      const json = response.json()
      expect(json.hello).toBe('world'); // success!
    })
});
```

#### This are the options that can be passed to the set function

The set function accept an object with those values, set can be called multiple times to fake multiple calls.

| Option   	| Default value 	| Description                                                                                                                                                                            	|
|----------	|---------------	|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------	|
| url      	| ''            	| The url for the call, including it's url parameters.                                                                                                                                   	|
| method   	| GET           	| The call method (GET, POST, UPDATE, DELETE...), case insensetive.                                                                                                                      	|
| timeout  	| 1             	| The timeout to wait for the response in milliseconds, for most tests 1 is fine just to fake an asynchronous nature, but for testing slow connectivity you can make this number higher. 	|
| code     	| 200           	| The response code you wish to get back, it is also used to fake rejection in libraries like axios by setting it to 404 or 500.                                                         	|
| response 	| {}            	| The actual response object the server should send, this doesn't have to be an object, any type will work.                                                                              	|
