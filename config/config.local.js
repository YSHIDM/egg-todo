// const {EggAppConfig, PowerPartial} = require('egg')

module.exports = () => {
  /**
   * @type {any} 配置
   */
  const config = exports = {}

  config.sequelize = {
    dialect: 'postgres', // support: mysql, mariadb, postgres, mssql
    host: 'localhost',
    port: 5434,
    username: 'postgres',
    password: 'postgres',
    database: 'test',
    timezone: '+08:00',
    define: {
      underscored: false,
    },
  }
  config.redis = {
    client: {
      port: 6378, // Redis port
      host: '127.0.0.1', // Redis host
      password: '123456',
      db: 0,
    },
  }

  return config
}
