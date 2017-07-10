'use strict';

const loopback = require('loopback');
const {connectors, getDsnFormRules} = require('../../common/dsn');
const validator = require('indicative');

function validateConnectionPar(err, done) {
  if (connectors.indexOf(this.connector) != -1) {
    const dsnValidationObj = getDsnFormRules(this.connector);
    console.log(dsnValidationObj.rules, dsnValidationObj.messages);
    Promise.resolve().then(() => validator.validateAll(this, dsnValidationObj.rules, dsnValidationObj.messages))
      .then(result => done())
      .catch(error => {
        err(new Error(JSON.stringify(error)));
        done();
      });
  } else {
    done();
  }
}

module.exports = (Dsn) => {
  Dsn.validatesInclusionOf('connector', {in: connectors});
  Dsn.validateAsync('dsnParams', validateConnectionPar, {message: 'connection parameters are invalid'});
};

