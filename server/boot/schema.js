'use strict';

module.exports = server => {

  const appDataSource = server.dataSources.db;

  const autoupdateTables = () => {

    const builtInModels = ['AccessToken', 'ACL', 'RoleMapping', 'Role'];
    const models = ['dsn', 'dsnColumn', 'dsnDb', 'dsnTable', 'project', 'user', 'workbook', 'worksheet'].concat(builtInModels);

    models.forEach(model => {
      appDataSource.autoupdate(model, err => {
        if (err) {
          console.log(err);
        }
        //  Handle the error to prevent application from Crashing
      });
    });
  }

  appDataSource.connected ? autoupdateTables() : appDataSource.once('connected', autoupdateTables);

};
