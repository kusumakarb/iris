const properties = {
  lastLogin: {
    type: String
  }
};

const options = {
  relations: {
    projects: {
      model: 'Project',
      type: 'hasMany',
      foreignKey: 'userId'
    },
    workbooks: {
      model: 'Workbook',
      type: 'hasMany',
      foreignKey: 'userId'
    },
    worksheets: {
      model: 'Worksheet',
      type: 'hasMany',
      foreignKey: 'userId'
    },
    dsns: {
      model: 'Dsn',
      type: 'hasMany',
      foreignKey: 'userId'
    },
    dsnDbs: {
      model: 'DsnDb',
      type: 'hasMany',
      foreignKey: 'userId'
    },
    dsnTables: {
      model: 'DsnTable',
      type: 'hasMany',
      foreignKey: 'userId'
    },
    dsnColumns: {
      model: 'DsnColumn',
      type: 'hasMany',
      foreignKey: 'userId'
    }
  }
};

const user = loopback.Model.extend('User', properties, options);
