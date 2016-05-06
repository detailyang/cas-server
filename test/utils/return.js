/*
* @Author: detailyang
* @Date:   2016-05-01 19:23:33
* @Last modified by:   detailyang
* @Last modified time: 2016-05-07T00:56:26+08:00
*/

'use strict';


const utils = require('../../src/utils');
const expect = require('chai').expect;


describe('utils code', function() {
  it('utils code should be ok', (done) => {
    expect(utils.return.getCode('abcdefg')).to.equal(1);
    expect(utils.return.getMsg('abcdefg')).to.equal('hi jack');
    done();
  });
});
