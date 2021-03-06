"use strict";

const mappify = require("../index.js").getClient();
const expect = require("chai").expect;

describe("autocomplete", () => {

    it("should exist", () => {
        expect(mappify.autocomplete).to.exist;
    });

    it("should return with error if the first argument isn't a string", (done) => {
        mappify.autocomplete({}, (err) => {
            expect(err).to.exist;
            expect(err.message).to.equal("Provided search value wasn't a string");
            done();
        });
    });

    it("should return with error if the first argument is an empty string", (done) => {
        mappify.autocomplete("", (err, res) => {
            expect(err).to.exist;
            expect(err.message).to.equal("Provided search string was empty");
            done();
        });
    });

    it("should return a response object for a valid address start string", (done) => {
        mappify.autocomplete("178 Wake", (err, res) => {
            expect(err).not.to.exist;
            expect(res).to.exist;
            expect(res.type).to.equal("completeAddressRecordArray");
            done();
        });
    });

    it("should allow disabling of prefix boosting by passing an options object as the second argument", (done) => {
        mappify.autocomplete("178 Wake", {boostPrefix: false}, (err, res) => {
            expect(err).not.to.exist;
            expect(res).to.exist;
            expect(res.type).to.equal("completeAddressRecordArray");
            done();
        });
    });

});
