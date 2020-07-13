// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'test_db',
      user: 'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    },
    debug: process.env.DATABASE_DEBUG === 'true'
    // useNullAsDefault: true,
    // connection: process.env.DATABASE_URL,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'postgres',
      password: 'postgres',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
    }
  }
};
