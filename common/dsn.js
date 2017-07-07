'use strict';

import {extendDeep} from "../lib/extend";

const dsnParamsRules = {
  mysql: {
    rules: {
      'dsnParams.host': 'required|string',
      'dsnParams.port': 'required|integer|range:0,65536',
      'dsnParams.username': 'required|string',
      'dsnParams.password': 'required|string',
    },
    sanitizationRules: {
      'dsnParams.port': 'to_int'
    },
    fields: [
      {
        name: 'dsnParams.host',
        type: 'text',
        label: 'Host',
        placeholder: 'Enter Host',
        default: 'localhost',
        info: 'Name or IP address of the server host',
      },
      {
        name: 'dsnParams.port',
        type: 'number',
        label: 'Port',
        placeholder: 'Enter Port',
        default: 3306,
        info: 'TCP/IP port (1-65535)',
      },
      {
        name: 'dsnParams.username',
        type: 'text',
        label: 'User',
        placeholder: 'Enter Username',
        info: 'Name of the user to connect with.',
      },
      {
        name: 'dsnParams.password',
        type: 'text',
        label: 'Password',
        placeholder: 'Enter Password',
        info: 'The user\'s password.',
      },
    ],
  },
  sqlite3: {
    rules: {
      'dsnParams.filePath': 'required|string',
    },
    fields: [
      {
        name: 'dsnParams.filePath',
        type: 'file',
        label: 'File location',
        placeholder: 'Enter File Location',
      },
    ]
  },
};

const dsnRules = {
  rules: {
    connector: 'required|in:' + Object.keys(dsnParamsRules),
  },
  messages: {
    range: '{{field}} must be in the range {{argument.0}} to {{argument.1}} exclusive',
  }
}

export function getDsnFormRules(connector) {
  return extendDeep({}, dsnRules, dsnParamsRules[connector])
}