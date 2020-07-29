// eslint-disable-next-line func-names
exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('user', table => {
      table.increments('id').primary();
    }),
  ]);
};

// eslint-disable-next-line func-names
exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable('user')]);
};
