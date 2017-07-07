'use strict';

const dsnSchema = {
  // MySQL
  mysql: {
    host: {
      type: 'string',
      required: true,
    },
    port: {
      type: 'number',
      required: true,
    },
    username: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
  // SqLite
  sqlite3: {
    filePath: {
      type: 'string',
      required: true,
    },
  },
}

module.exports = dsnSchema
