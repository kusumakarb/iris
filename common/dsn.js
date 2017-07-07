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
        {label: 'Host', name: 'host', type: 'text', placeholder: 'Enter Host', dflt: 'localhost'},
        {label: 'Port', name: 'port', type: 'number', placeholder: 'Enter Port', dflt: 3306},
        {label: 'User', name: 'user', type: 'text', placeholder: 'Enter User'},
        {label: 'Password', name: 'password', type: 'text', placeholder: 'Enter Password'},
    ],
    sanitizationRules: {
    },
  },
  sqlite3: {
    rules: {
      filePath: 'required|string',
    },
    fields: [
      {label: 'Filepath', name: 'filePath', type: 'text', placeholder: 'Enter Filepath'},
    ],
    sanitizationRules: {
    },
  },
};

module.exports = dsnSchema;
