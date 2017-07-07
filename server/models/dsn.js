'use strict';

const loopback = require('loopback');
const connectionSchema = require('../../common/schema');
const validator = require('indicative');

function validateConnectionPar(err, done) {
  const {connector, connectionParams} = this;
  const dbConnSchema = connectionSchema[connector];
  const messages = {
    range: '{{field}} must be in the range {{argument.0}} to {{argument.1}}',
  };
  Promise.resolve().then(() => validator.validateAll(connectionParams, dbConnSchema, messages))
    .then(result => done())
    .catch(error => {
      err(new Error(JSON.stringify(error)));
      done();
    });
}

module.exports = (Dsn) => {
  const connectors = Object.keys(connectionSchema);
  Dsn.validatesInclusionOf('connector', {'in': connectors});
  Dsn.validateAsync('connectionParams', validateConnectionPar, {message: 'connection parameters are invalid'});
};

