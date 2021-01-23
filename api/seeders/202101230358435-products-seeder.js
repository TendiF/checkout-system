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
  db.runSql(`INSERT INTO products (sku, name, price, qty) 
    VALUES 
    ('SKU00001', 'Google Home', 49.99, 10),
    ('SKU00002', 'Macbook Pro', 5399.99, 5),
    ('SKU00003', 'Alexa Speaker', 109.50, 10),
    ('SKU00004', 'Rasberry Pi B', 30.00, 2)`, [], callback)
  return null;
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
