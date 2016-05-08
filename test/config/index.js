/*
* @Author: detailyang
* @Date:   2016-05-08 22:43:25
* @Last Modified by:   detailyang
* @Last Modified time: 2016-05-08 23:33:42
*/

'use strict';
/**
 * Removes a module from the cache
 */
require.uncache = function (moduleName) {
    // Run over the cache looking for the files
    // loaded by the specified module name
    require.searchCache(moduleName, function (mod) {
        delete require.cache[mod.id];
    });

    // Remove cached paths to the module.
    // Thanks to @bentael for pointing this out.
    Object.keys(module.constructor._pathCache).forEach(function(cacheKey) {
        if (cacheKey.indexOf(moduleName)>0) {
            delete module.constructor._pathCache[cacheKey];
        }
    });
};

/**
 * Runs over the cache to search for all the cached
 * files
 */
require.searchCache = function (moduleName, callback) {
    // Resolve the module identified by the specified name
    var mod = require.resolve(moduleName);

    // Check if the module has been resolved and found within
    // the cache
    if (mod && ((mod = require.cache[mod]) !== undefined)) {
        // Recursively go over the results
        (function run(mod) {
            // Go over each of the module's children and
            // run over it
            mod.children.forEach(function (child) {
                run(child);
            });

            // Call the specified callback providing the
            // found module
            callback(mod);
        })(mod);
    }
};


const expect = require('chai').expect;


describe('config should be ok', () => {
    it('mysql test should be ok', (done) => {
        require.uncache('../../src/config/mysql');
        process.env.NODE_ENV='test';
        let mysql = require('../../src/config/mysql');
        expect(mysql.username).not.to.be.an('undefined');
        expect(mysql.database).not.to.be.an('undefined');
        expect(mysql.host).not.to.be.an('undefined');
        expect(mysql.port).not.to.be.an('undefined');
        expect(mysql.logging).to.be.false;
        done();
    });
    it('mysql dev should be ok', (done) => {
        require.uncache('../../src/config/mysql');
        process.env.NODE_ENV='dev';
        let mysql = require('../../src/config/mysql');
        expect(mysql.username).to.equal('root');
        expect(mysql.password).to.equal('');
        expect(mysql.database).to.equal('cas');
        expect(mysql.host).to.equal('127.0.0.1');
        expect(mysql.port).to.equal('3306');
        done();
    });
    it('mysql prod should be ok', (done) => {
        require.uncache('../../src/config/mysql');
        process.env.NODE_ENV='production';
        let mysql = require('../../src/config/mysql');
        expect(mysql.username).to.be.an('undefined');
        expect(mysql.database).to.be.an('undefined');
        expect(mysql.host).to.be.an('undefined');
        expect(mysql.port).to.be.an('undefined');
        expect(mysql.logging).to.be.false;
        done();
    });
    it('cache test should be ok', (done) => {
        require.uncache('../../src/config/cache');
        process.env.NODE_ENV='test';
        let cache = require('../../src/config/cache');
        expect(cache.host).to.equal('127.0.0.1');
        expect(cache.port).to.equal('6379');
        expect(cache.ttl).to.equal(3600);
        expect(cache.db).to.equal('2');
        done();
    });
    it('cache dev should be ok', (done) => {
        require.uncache('../../src/config/cache');
        process.env.NODE_ENV='dev';
        let cache = require('../../src/config/cache');
        expect(cache.host).to.equal('127.0.0.1');
        expect(cache.port).to.equal('6379');
        expect(cache.ttl).to.equal(3600);
        expect(cache.db).to.equal('2');
        done();
    });
    it('cache prod should be ok', (done) => {
        require.uncache('../../src/config/cache');
        process.env.NODE_ENV='production';
        let cache = require('../../src/config/cache');
        expect(cache.host).to.be.an('undefined');
        expect(cache.port).to.be.an('undefined');
        expect(cache.ttl).to.be.an('undefined');
        expect(cache.db).to.be.an('undefined');
        done();
    });
    it('queue test should be ok', (done) => {
        require.uncache('../../src/config/queue');
        process.env.NODE_ENV='test';
        let queue = require('../../src/config/queue');
        expect(queue.name).to.equal('cas');
        expect(queue.hostname).to.equal('127.0.0.1');
        expect(queue.port).to.equal(6379);
        expect(queue.db).to.equal('1');
        done();
    });
    it('queue dev should be ok', (done) => {
        require.uncache('../../src/config/queue');
        process.env.NODE_ENV='dev';
        let queue = require('../../src/config/queue');
        expect(queue.name).to.equal('cas');
        expect(queue.hostname).to.equal('127.0.0.1');
        expect(queue.port).to.equal(6379);
        expect(queue.db).to.equal('1');
        done();
    });
    it('queue prod should be ok', (done) => {
        require.uncache('../../src/config/queue');
        process.env.NODE_ENV='production';
        let queue = require('../../src/config/queue');
        expect(queue.name).to.be.an('undefined');
        expect(queue.hostname).to.be.an('undefined');
        expect(queue.port).to.be.an('undefined');
        expect(queue.db).to.be.an('undefined');
        done();
    });
    it('session test should be ok', (done) => {
        require.uncache('../../src/config/session');
        process.env.NODE_ENV='test';
        let session = require('../../src/config/session');
        expect(session.host).to.equal('127.0.0.1');
        expect(session.ttl).to.equal(3600);
        expect(session.db).to.equal(0);
        expect(session.cookiekey).to.equal('cas');
        expect(session.key).to.equal('momtellmewhy');
        expect(session.secure).to.be.false;
        expect(session.http_only).to.be.false;
        expect(session.domain).to.be.an('undefined');
        done();
    });
    it('session dev should be ok', (done) => {
        require.uncache('../../src/config/session');
        process.env.NODE_ENV='dev';
        let session = require('../../src/config/session');
        expect(session.host).to.equal('127.0.0.1');
        expect(session.port).to.equal('6379');
        expect(session.ttl).to.equal(3600);
        expect(session.db).to.equal(0);
        expect(session.cookiekey).to.equal('cas');
        expect(session.key).to.equal('momtellmewhy');
        expect(session.secure).to.be.false;
        expect(session.http_only).to.be.false;
        expect(session.domain).to.be.an('undefined');
        done();
    });
    it('session prod should be ok', (done) => {
        require.uncache('../../src/config/session');
        process.env.NODE_ENV='production';
        let session = require('../../src/config/session');
        expect(session.host).to.be.an('undefined');
        expect(session.port).to.be.an('undefined');
        expect(session.ttl).to.equal(3600);
        expect(session.db).to.equal(0);
        expect(session.cookiekey).to.equal('cas');
        expect(session.key).to.equal('iamyoufather');
        expect(session.secure).to.be.false;
        expect(session.http_only).to.be.false;
        expect(session.domain).to.be.an('undefined');
        done();
    });
    it('syslog test should be ok', (done) => {
        require.uncache('../../src/config/syslog');
        process.env.NODE_ENV='test';
        let syslog = require('../../src/config/syslog');
        expect(syslog.tag).to.equal('cas');
        expect(syslog.facility).to.equal('local6');
        expect(syslog.hostname).to.equal('127.0.0.1');
        expect(syslog.port).to.equal(514);
        done();
    });
    it('syslog dev should be ok', (done) => {
        require.uncache('../../src/config/syslog');
        process.env.NODE_ENV='dev';
        let syslog = require('../../src/config/syslog');
        expect(syslog.tag).to.equal('cas');
        expect(syslog.facility).to.equal('local6');
        expect(syslog.hostname).to.equal('127.0.0.1');
        expect(syslog.port).to.equal(514);
        done();
    });
    it('syslog prod should be ok', (done) => {
        require.uncache('../../src/config/syslog');
        process.env.NODE_ENV='production';
        let syslog = require('../../src/config/syslog');
        expect(syslog.tag).to.be.an('undefined');
        expect(syslog.facility).to.be.an('undefined');
        expect(syslog.hostname).to.be.an('undefined');
        expect(syslog.port).to.be.an('undefined');
        done();
    });
});
