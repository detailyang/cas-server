/**
* @Author: BingWu Yang (https://github.com/detailyang) <detailyang>
* @Date:   2016-05-07T00:51:59+08:00
* @Email:  detailyang@gmail.com
* @Last modified by:   detailyang
* @Last modified time: 2016-05-07T01:02:41+08:00
* @License: The MIT License (MIT)
*/


const utils = require('../../src/utils');
const expect = require('chai').expect;


describe('utils error', () => {
  it('utils code ParamsError should be ok', (done) => {
    try {
      throw new utils.error.ParamsError()
    } catch (e) {
    }
    done();
  });
  it('utils code PermissionError should be ok', (done) => {
    try {
      throw new utils.error.PermissionError()
    } catch (e) {
    }
    done();
  });
  it('utils code NotFoundError should be ok', (done) => {
    try {
      throw new utils.error.NotFoundError()
    } catch (e) {
    }
    done();
  });
  it('utils code ServerError should be ok', (done) => {
    try {
      throw new utils.error.ServerError()
    } catch (e) {
    }
    done();
  });
  it('utils code ParamsError should be ok', (done) => {
    try {
      throw new utils.error.ParamsError()
    } catch (e) {
    }
    done();
  });
});
