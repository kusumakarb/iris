'use strict';

const loopback = require('loopback');
const connectionSchema = require('../../common/schema');
const Validator = require('validatorjs');

function validateConnectionPar(err) {
  const {connector, connectionParams} = this;
  const dbConnSchema = connectionSchema[connector];
  const validation = new Validator(connectionParams, dbConnSchema);
  if (validation.fails()) {
    err(new Error(JSON.stringify(validation.errors.all())));
  }
}

module.exports = (Dsn) => {
  const connectors = Object.keys(connectionSchema);
  Dsn.validatesInclusionOf('connector', {'in': connectors});
  Dsn.validate('connectionParams', validateConnectionPar, {message: 'connection parameters are invalid'});
};

