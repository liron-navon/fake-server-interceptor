import { createNewTestValue, clearTestValues } from '../src/helpers';
import { setupFetchFakeServer } from '../src/fetch';
import { setupXhrFakeServer } from './xhr';

const fakeServer = {};

fakeServer.init = () => {
  setupXhrFakeServer();
  setupFetchFakeServer();
  return fakeServer;
};

fakeServer.set = (options) => {
  createNewTestValue(options);
  return fakeServer;
};

fakeServer.clear = () => {
  clearTestValues();
  return fakeServer;
};

export default fakeServer;
module.exports = fakeServer;
