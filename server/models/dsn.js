'use strict';

const loopback = require('loopback');
const dsnSchema = require('../../common/dsn');
const validator = require('indicative');
const connectors = Object.keys(dsnSchema);

function validateConnectionPar(err, done) {
  const {connector, dsnParams} = this;
  if (connectors.indexOf(connector) != -1) {
    const dbConnSchema = dsnSchema[connector].rules;
    const messages = {
      range: '{{field}} must be in the range {{argument.0}} to {{argument.1}} exclusive',
    };
    Promise.resolve().then(() => validator.validateAll(dsnParams, dbConnSchema, messages))
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
  Dsn.validatesInclusionOf('connector', {'in': connectors});
  Dsn.validateAsync('dsnParams', validateConnectionPar, {message: 'connection parameters are invalid'});
};

