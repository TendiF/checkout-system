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

exports.up = function(db, callback) {
  db.runSql(`INSERT INTO checkout_rules (sku, min_qty, type, value) 
    VALUES 
    ('SKU00002', 1, 'free_product', 'SKU00004'),
    ('SKU00001', 3, 'free_product', 'SKU00001' ),
    ('SKU00003', 3, 'dicount', 10)`, [], callback)
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
