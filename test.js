const should = require("should");
const request = require("request");
const expect = require("chai").expect;
const baseUrl = "http://localhost:3000";
const util = require("util");

describe('Get all contacts(empty list)', function() {
    it('Get all contacts', function(done) {
        request.get({ url: baseUrl + '/contact' },
            function(error, response, bd) {
               const body = JSON.parse(bd);
                  expect(response.statusCode).to.equal(200);
                  expect(body.length).to.equal(0);
                done();
            });
    });
});


describe('Create a contact', function() {
    it('Create a contact', function(done) {
      request(
         { method: 'POST'
         , uri: baseUrl + '/contact/Alice'
         , form:
            { 'content-type': 'application/json'
             ,  body: JSON.stringify({phone : "1234567"})
             }
        },

        /*request.post({
           url: baseUrl + '/contact/Alice',
            form: { body: JSON.stringify({phone : "1234567"})}},*/
            function(error, response, bd) {
                  expect(error).to.equal(null);
                  expect(response.statusCode).to.equal(200);
                done();
            });
    });
});

describe('Get all contacts(one person)', function() {
    it('Get all contacts', function(done) {
        request.get({ url: baseUrl + '/contact' },
            function(error, response, bd) {
            		const body = JSON.parse(bd);
                  expect(response.statusCode).to.equal(200);
                  expect(body.length).to.equal(1);
                  expect(body[0].name).to.equal("Alice");
                done();
            });
    });
});

describe('Create another contact', function() {
    it('Create a contact', function(done) {
      request(
         { method: 'POST'
         , uri: baseUrl + '/contact/Bob'
         , form:
            { 'content-type': 'application/json'
             ,  body: JSON.stringify({phone : "1234567"})
             }
        },

        /*request.post({
           url: baseUrl + '/contact/Alice',
            form: { body: JSON.stringify({phone : "1234567"})}},*/
            function(error, response, bd) {
                  expect(error).to.equal(null);
                  expect(response.statusCode).to.equal(200);
                done();
            });
    });
});

describe('Create another contact', function() {
    it('Create a contact', function(done) {
      request(
         { method: 'POST'
         , uri: baseUrl + '/contact/Greg'
         , form:
            { 'content-type': 'application/json'
             ,  body: JSON.stringify({phone : "1234567"})
             }
        },

        /*request.post({
           url: baseUrl + '/contact/Alice',
            form: { body: JSON.stringify({phone : "1234567"})}},*/
            function(error, response, bd) {
                  expect(error).to.equal(null);
                  expect(response.statusCode).to.equal(200);
                done();
            });
    });
});



describe('Get all contacts(three people)', function() {
    it('Get all contacts', function(done) {
        request.get({ url: baseUrl + '/contact' },
            function(error, response, bd) {
            		const body = JSON.parse(bd);
                  expect(response.statusCode).to.equal(200);
                  expect(body.length).to.equal(3);
                  expect(body[0].name).to.equal("Alice");
                done();
            });
    });
});

describe('Get two contacts(three people)', function() {
    it('Get two contacts(three people)', function(done) {
        request.get({ url: baseUrl + '/contact?page=0&pageSize=2' },
            function(error, response, bd) {
            		const body = JSON.parse(bd);
                  expect(response.statusCode).to.equal(200);
                  expect(body.length).to.equal(2);
                  expect(body[0].name).to.equal("Alice");
                done();
            });
    });
});

describe('Get one contacts(three people)', function() {
    it('Get one contacts(three people)', function(done) {
        request.get({ url: baseUrl + '/contact?page=1&pageSize=2' },
            function(error, response, bd) {
            		const body = JSON.parse(bd);
                  expect(response.statusCode).to.equal(200);
                  expect(body.length).to.equal(1);
                  expect(body[0].name).to.equal("Greg");
                done();
            });
    });
});

describe('Get all names that start with g', function() {
    it('Get all names that start with g', function(done) {
        request.get({ url: baseUrl + '/contact?page=0&pageSize=2&query=g' },
            function(error, response, bd) {
            		const body = JSON.parse(bd);
                  expect(response.statusCode).to.equal(200);
                  expect(body.length).to.equal(1);
                  expect(body[0].name).to.equal("Greg");
                done();
            });
    });
});

describe('delete a contact', function() {
    it('delete a contact', function(done) {
        request.delete({ url: baseUrl + '/contact/Greg' },
            function(error, response, bd) {
                  expect(response.statusCode).to.equal(200);
                done();
            });
    });
});

describe('Get all contacts(two people)', function() {
    it('Get all contacts', function(done) {
        request.get({ url: baseUrl + '/contact' },
            function(error, response, bd) {
            		const body = JSON.parse(bd);
                  expect(response.statusCode).to.equal(200);
                  expect(body.length).to.equal(3);
                  expect(body[0].name).to.equal("Alice");
                done();
            });
    });
});


describe('delete a contact', function() {
    it('delete a contact', function(done) {
        request.delete({ url: baseUrl + '/contact/Alice' },
            function(error, response, bd) {
                  expect(response.statusCode).to.equal(200);
                done();
            });
    });
});

describe('delete a contact', function() {
    it('delete a contact', function(done) {
        request.delete({ url: baseUrl + '/contact/Bob' },
            function(error, response, bd) {
                  expect(response.statusCode).to.equal(200);
                done();
            });
    });
});

describe('redelete a contact', function() {
    it('redelete a contact', function(done) {
        request.delete({ url: baseUrl + '/contact/Bob' },
            function(error, response, bd) {
                  expect(response.statusCode).to.equal(404);
                done();
            });
    });
});
