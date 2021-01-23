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
  return db.createTable('checkout_rules', {
    id: {
      type: 'bigint',
      primaryKey: true,
      autoIncrement: true,
      length: 36,
    },
    sku: {
      type: 'string',
      notNull: true,
      length: 20,
      foreignKey: {
        name: 'products_uuid_fk',
        table: 'products',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        },
        mapping: 'sku'
      }
    },
    min_qty: {
      type: 'int',
      notNull: true,
      length: 20
    },
    type: {
      type: 'string',
      notNull: true,
      length: 20
    },
    value: {
      type: 'string',
      notNull: true,
      length: 20
    },
  })
};

exports.down = function(db) {
  return db.dropTable('checkout_rules', callback);

};

exports._meta = {
  "version": 1
};
