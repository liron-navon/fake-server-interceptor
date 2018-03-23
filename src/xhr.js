// overriding XMLHttpRequest
import { createKey, forceWritable } from './helpers';
import { urlMapper } from './urlsMapper';

class xhrCopy {

  addEventListener(name, cb) {
    if (!this.events) {
      this.events = {};
    }
    this.events[name] = cb;
  }

  _emit(name, data) {
    if (!this.events) {
      return;
    }
    if (this.events[name]) {
      this.events[name](data);
    }
  }

  open(method, url, b) {
    const testUrl = createKey(url, method);
    this.$$testData = urlMapper[testUrl];

    // return this.$$defineMyPropsWritable('readyState', window.XMLHttpRequest.OPENED);
  }

  overrideMimeType() {
    // just an interface
  }

  send() {
    return setTimeout(() => {
      this.$$defineMyPropsWritable('readyState', 4);
      this.$$defineMyPropsWritable('status', this.$$testData.code);
      if (this.onreadystatechange) {
        this.onreadystatechange();
      }

      this._emit('load');
      this._emit('loaded');
      this._emit('loadend');
      if (this.onload) {
        onload();
      }
      if (this.loaded) {
        this.loaded();
      }
    }, this.$$testData.timeout);
  }

  constructor() {
    this._response = {};
    this.$$defineMyPropsWritable('statusText', 'Replaced by xhrInterceptor, please make sure you never see this message in production');
  }

  // helper to define a writable property (when extending xhr)
  $$defineMyPropsWritable(prop, value) {
    return this[prop] = value;  // forceWritable(this, prop, value);
  }

  // this will appear as xhr data in the result
  get responseText() {
    if (this.$$testData) {
      return this.$$testData.response;
    }
    return super.responseText;
  }

  get response() {
    if (this.$$testData) {
      return this.$$testData.response;
    }
    return super.responseText;
  }
}

xhrCopy.OPENED = 4

export const setupXhrFakeServer = () => {
  window.XMLHttpRequest = xhrCopy;
};
