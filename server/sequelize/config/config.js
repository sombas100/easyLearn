require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL || 'postgres://ua1rcbct91d2i6:pb0a5f9f5ef4e312f862e10b148a9c07d04b1f12371df5d72c246e0b8fd9f5ca3@c724r43q8jp5nk.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com:5432/ddu6cmtk8ckag2',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  },
  test: {
    url: process.env.TEST_DATABASE_URL || 'postgres://ua1rcbct91d2i6:pb0a5f9f5ef4e312f862e10b148a9c07d04b1f12371df5d72c246e0b8fd9f5ca3@c724r43q8jp5nk.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com:5432/ddu6cmtk8ckag2',
    dialect: 'postgres'
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};


