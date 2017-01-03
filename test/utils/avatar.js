/*
* @Author: detailyang
* @Date:   2016-05-01 19:23:33
* @Last modified by:   detailyang
* @Last modified time: 2016-05-07T00:56:26+08:00
*/

'use strict';


const utils = require('../../src/utils');
const expect = require('chai').expect;


describe('avatar should be ok', function() {
  it('avatr should be ok', (done) => {
    expect(utils.avatar.generate(1, 1, 400)).to.be.a('promise');
    done();
  });
});
