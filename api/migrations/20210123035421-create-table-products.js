'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('products', {
    sku: {
      type: 'string',
      primaryKey: true,
      length: 36,
    },
    name: {
      type: 'string',
      notNull: true,
      length: 20
    },
    price: {
      type: 'float',
      notNull: true,
    },
    qty: {
      type: 'int',
      notNull: true,
      length: 20
    },
  })
};

exports.down = function(db) {
  return db.dropTable('products', callback);
};

exports._meta = {
  "version": 1
};
