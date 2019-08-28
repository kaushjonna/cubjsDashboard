'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable('dataset', {
    key: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    transactionId: {
      type: 'string',
    },
    impressionDate: {
      type: 'date',
    },
    conversionDate: {
      type: 'date'
    },
    createTime: {
      type: 'timestamp',
    },
    locationName: {
      type: 'string'
    },
    address: {
      type: 'text'
    },
    city: {
      type: 'string'
    },
    lat: {
      type: 'decimal'
    },
    lng: {
      type: 'decimal'
    },
    creativeId: {
      type: 'string'
    },
    campaignId: {
      type: 'int'
    },
    campaignName: {
      type: 'string'
    }

  }, function (err) {
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function (db, callback) {
  db.dropTable('dataset', callback)
};

exports._meta = {
  "version": 1
};
