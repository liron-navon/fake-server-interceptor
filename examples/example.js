import { createNewTestValue } from '../src/helpers';
import { setupXhrFakeServer, } from '../src/xhr';
import { setupFetchFakeServer, } from '../src/fetch';

setupXhrFakeServer();
setupFetchFakeServer();


createNewTestValue({
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts',
  response: { hello: 'world', },
  code: 200,
});

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then((myJson) => {
    console.log(myJson);
  });

