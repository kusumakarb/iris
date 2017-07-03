'use strict';

module.exports = app => {

  const appDataSource = app.dataSources.db;

  const autoupdateTables = () => {

    const builtInModels = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role'];
    const models = ['Project', 'Workbook', 'Worksheet', 'Dsn', 'DsnDb', 'DsnTable', 'DsnColumn'].concat(builtInModels);

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
