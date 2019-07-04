let config = {
  "cron": "*/5 * * * * *", // 定时任务时间表达式 同quartz中的 5秒一次
  // 数据库配置

 // "db": {
 //   "type": "mysql", // 类型
 //   "host": "127.0.0.1", // ip+port
 //   "user": "", // 用户名
 //   "password": "", // 密码
 //   "database": "", // 数据库名
 //   "sql": "select 1" // 执行的sql语句
 // },

  // "db": {
  //   "type": "mssql", // 类型
  //   "host": "127.0.0.1", // ip+port
  //   "user": "", // 用户名
  //   "password": "", // 密码
  //   "database": "", // 数据库名
  //   "sql": "select 1" // 执行的sql语句
  // },

  "db": {
    "type": "oracle", // 类型
    "host": "127.0.0.1", // ip+port
    "user": "", // 用户名
    "password": "", // 密码
    "database": "", // 数据库名
    "sql": "select 1 from dual" // 执行的sql语句
  },
};

module.exports = config;
module.exports.default = module.exports;
