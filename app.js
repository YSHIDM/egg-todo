// app.js
class AppBootHook {
  constructor(app) {
    this.app = app
  }

  // configWillLoad() {
  // 此时 config 文件已经被读取并合并，但是还并未生效
  // 这是应用层修改配置的最后时机
  // 注意：此函数只支持同步调用
  // }

  // async configDidLoad() {
  //   // 配置文件加载完成
  // }
  // async didLoad() {
  // 所有的配置已经加载完毕 文件加载完成
  // 可以用来加载应用自定义的文件，启动自定义的服务
  // }

  // async willReady() {
  // if (this.app.config.env === 'local' || this.app.config.env === 'unittest') {
  //   // force: true: 强制建表,如果该表已经存在，则将其首先删除; force: false: 没有表时建表, 默认 false,如果已经存在，则不执行任何操作; alter: true 这将检查数据库中表的当前状态（它具有哪些列，它们的数据类型等），然后在表中进行必要的更改以使其与模型匹配
  //   // await this.app.model.sync({ force: false });
  // }
  //   const room = await this.app.redis.get('room:demo');
  //   if (!room) {
  //     await this.app.redis.set('room:demo', 'demo');
  //   }
  // }

  async didReady() {
    // 应用已经启动完毕
    this.app.emit('reloadScheduleList')
  }

  async serverDidReady() {
    // serverDidReady
    // const alinode:any = { process }
    // log('process.versions', alinode);
    const ctx = this.app.createAnonymousContext()
    this.app.messenger.on('work', scheduleRecord => {
      ctx.service.scheduleRecordSvc.execCallback(scheduleRecord)
    })
  }
  // async beforeClose() {
  //   // 应用即将关闭
  // }
}

module.exports = AppBootHook

// module.exports = app => {
//   app.beforeStart(async () => {
//       // 从配置中心获取 MySQL 的配置
//       // { host: 'mysql.com', port: '3306', user: 'test_user', password: 'test_password', database: 'test' }
//       await app.model.sync({ force: true });
//   });
// };
