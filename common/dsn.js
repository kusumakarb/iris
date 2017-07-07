'use strict';

const dsnSchema = {
  mysql: {
    rules: {
      host: 'required|string',
      port: 'required|integer|range:0,65536',
      username: 'required|string',
      password: 'required|string',
    },
    fields: [
        {name: 'host', label: 'Host', type: 'text', placeholder: 'Enter Host', dflt: 'localhost'},
        {name: 'port', label: 'Port', type: 'number', placeholder: 'Enter Port', dflt: 3306},
        {name: 'username', label: 'User', type: 'text', placeholder: 'Enter Username'},
        {name: 'password', label: 'Password', type: 'text', placeholder: 'Enter Password'},
    ],
    sanitizationRules: {
    },
  },
  sqlite3: {
    rules: {
      filePath: 'required|string',
    },
    fields: [
      {name: 'filePath', label: 'Filepath', type: 'text', placeholder: 'Enter Filepath'},
    ],
    sanitizationRules: {
    },
  },
};

module.exports = dsnSchema;
