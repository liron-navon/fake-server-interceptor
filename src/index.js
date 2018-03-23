import { createNewTestValue, clearTestValues } from '../src/helpers';
import { setupFetchFakeServer } from '../src/fetch';
import { setupXhrFakeServer } from './xhr';

export default {
  init: () => {
    setupXhrFakeServer();
    setupFetchFakeServer();
  },
  set: createNewTestValue,
  clear: clearTestValues,
};
