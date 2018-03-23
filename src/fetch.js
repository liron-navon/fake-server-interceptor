/* eslint-disable no-global-assign */
import { createKey, } from './helpers';
import { urlMapper, } from './urlsMapper';

if (!window.fetch) {
  window.fetch = () => { console.error('fetch is not supported'); };
}

// keep the original fetch to be used if we need it
const tempFetch = window.fetch;

// create a fake fetch with similar api
const fakeFetch = (url, options = {}) => {
  if (typeof url === 'object') {
    // to handle when passing a Request object
    options.method = url.method;
    url = url.url;
  }

  const { method = 'GET', } = options;
  const testUrl = createKey(url, method);
  const testData = urlMapper[testUrl];

  // no test data, make fetch work as usual
  if (!testData) {
    return tempFetch(url, options);
  }

  // return test values
  const { response, timeout, code, } = testData;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        json: () => response,
        status: code,
        ok: true,
        statusText: 'OK',
      });
    }, timeout);
  });
};

// assign our fake fetch to the real fetch
export const setupFetchFakeServer = () => {
  window.fetch = fakeFetch;
};
