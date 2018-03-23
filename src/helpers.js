/* eslint-disable guard-for-in */
import { urlMapper } from './urlsMapper';

// creates a key from a method and a url
export const createKey = (url, method) => (`${method}:${url}`).toLowerCase();

// simple function to create a new test value
export const createNewTestValue = (options) => {
  const { url = '', method = 'GET', timeout = 1, code = 200, response = {} } = options;

  const testKey = createKey(url, method);
  urlMapper[testKey] = { response, code, timeout };
};

// cleares the url mapper
export const clearTestValues = () => {
  for (const key in urlMapper) {
    delete urlMapper[key];
  }
};

