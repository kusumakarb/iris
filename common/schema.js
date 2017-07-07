'use strict';

const dsnSchema = {
  // MySQL
  mysql: {
    host: 'required|string',
    port: 'required|integer|range:0,65536',
    username: 'required|string',
    password: 'required|string',
  },
  // SqLite
  sqlite3: {
    filePath: 'required|string',
  },

}

module.exports = dsnSchema
