'use strict';

const dsnSchema = {
  // MySQL
  mysql: {
    host: 'required|string',
    port: 'required|integer|min:0|max:65536',
    username: 'required|string',
    password: 'required|string',
  },
  // SqLite
  sqlite3: {
    filePath: 'required|string',
  },

}

module.exports = dsnSchema
