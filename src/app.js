
/**
 *
 */

const mongodb = require('mongodb');
const PartsController = require('./controllers/PartsController');
const TouchscreenController = require('./controllers/TouchscreenController');
const DatabaseCollection = require('./db/DatabaseCollection');
const DbAccess = require('./db/DbAccess');
const Promise = require('bluebird');
const remote = require('electron').remote;

angular.module('KioskApp', [
    'ngMessages',
    'ngMaterial',
    'angAccordion'
])
.provider('dbAccess', function () {
    let dbAccess = null;

    let dbAccessPromise = mongodb.connect(remote.process.env.MONGODB_URL)
       .then( mongo =>
       {
           dbAccess = new DbAccess(mongo);
           return dbAccess;
       });
       Promise.assimilate = Promise.resolve;

    this.$get = function() {
        if(!dbAccess) {
            return Promise.assimilate(dbAccessPromise);
        } else {
            return Promise.resolve(dbAccess);
        }
    };
})
.factory('scPartsCollection', function (dbAccess) {
    return dbAccess.then( (db) => {
        return new DatabaseCollection(db, 'parts');
    });
})
.controller('PartsController', PartsController)
.controller('TouchscreenController', TouchscreenController);
