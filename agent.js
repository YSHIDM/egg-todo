const schedule = require('node-schedule');
// const socket = require('socket.io-client')('http://127.0.0.1:7001/chat')

module.exports = agent => {

  /**
   * 根据定时器记录设置定时器
   * @param {*} scheduleRecord 定时器记录
   */
  const setSchedule = async scheduleRecord => {
    /**
     * cron表达式
     * 结构：秒 分 时 日 月 年
     */
    const cron = scheduleRecord.cron.join(' ');// 正式
    // let cron = ['*', '*', '*', '*', '*', '*'].join(' ');// 测试
    // 用定时器记录的 id 做定时器名字
    schedule.scheduleJob(scheduleRecord.id, cron, () => {
      agent.messenger.sendRandom('work', scheduleRecord);
    });
  };
  /**
   * 加载定时器
   * @param {*} scheduleRecord 定时器记录
   */
  const loadSchedule = async scheduleRecord => {
    /*
     * scheduledJobs 包含了所有时间表和任务名（或type）
     */
    const job = schedule.scheduledJobs[scheduleRecord.id];
    if (job) {
      /**
       * 修改后cron表达式
       */
      const cron = scheduleRecord.cron.join(' ');// 正式
      // let cron2 = ['*/5', '*', '*', '*', '*', '*'].join(' ');// 测试
      schedule.rescheduleJob(job, cron);

    } else {
      await setSchedule(scheduleRecord);
    }
  };
  /**
   * 初始化定时器列表
   * @param {*} ctx 上下文
   */
  const initScheduleList = async ctx => {
    const model = ctx.model.ScheduleRecord;
    const scheduleRecordList = await model.findAll({ raw: true });
    scheduleRecordList.forEach(async scheduleRecord => {
      if (scheduleRecord.state) {
        await setSchedule(scheduleRecord);
      }
    });
  };
  const ctx = agent.createAnonymousContext();
  agent.ready(async () => {
    initScheduleList(ctx);
  });
  agent.messenger.on('loadSchedule', async scheduleRecord => {
    loadSchedule(scheduleRecord);
  });
  // 用定时器记录的 id 做定时器名字
  agent.messenger.on('cancelJobByName', async scheduleName => {
    schedule.cancelJob(scheduleName);
  });
  agent.messenger.on('reloadScheduleList', async () => {
    for (const jobName in schedule.scheduledJobs) {
      if (schedule.scheduledJobs.hasOwnProperty(jobName)) {
        const job = schedule.scheduledJobs[jobName];
        job.cancel();
      }
    }
    initScheduleList(ctx);
  });
};
// app.js
class AppBootHook {
  constructor(agent) {
    this.agent = agent;
  }

  // configWillLoad() {
  // }

  // async didLoad() {
  // }

  async willReady() {
    // const room = await this.app.redis.get('room:demo');
    // if (!room) {
    //   await this.app.redis.set('room:demo', 'demo');
    // }
    console.log('willReady');
    this.agent.messenger.on('loadSchedule', async scheduleRecord => {
      this.loadSchedule(scheduleRecord);
    });
    // 用定时器记录的 id 做定时器名字
    this.agent.messenger.on('cancelJobByName', async scheduleName => {
      schedule.cancelJob(scheduleName);
    });
    this.agent.messenger.on('reloadScheduleList', async ctx => {
      console.log('reloadScheduleList');
      for (const jobName in schedule.scheduledJobs) {
        if (schedule.scheduledJobs.hasOwnProperty(jobName)) {
          const job = schedule.scheduledJobs[jobName];
          job.cancel();
        }
      }
      this.initScheduleList(ctx);
    });
  }

  async didReady() {
    console.log('didReady');
    const ctx = await this.agent.createAnonymousContext();
    // this.app.model.sync()
    this.initScheduleList(ctx);
  }

  // async serverDidReady() {

  // }
  /**
   * 根据定时器记录设置定时器
   * @param {*} scheduleRecord 定时器记录
   */
  async setSchedule(scheduleRecord) {
    /**
     * cron表达式
     * 结构：秒 分 时 日 月 年
     */
    const cron = scheduleRecord.cron.join(' ');// 正式
    // let cron = ['*', '*', '*', '*', '*', '*'].join(' ');// 测试
    // 用定时器记录的 id 做定时器名字
    schedule.scheduleJob(scheduleRecord.id, cron, () => {
      this.agent.messenger.sendRandom('work', scheduleRecord);
    });
  }
  /**
   * 加载定时器
   * @param {*} scheduleRecord 定时器记录
   */
  async loadSchedule(scheduleRecord) {
    /*
     * scheduledJobs 包含了所有时间表和任务名（或type）
     */
    const job = schedule.scheduledJobs[scheduleRecord.id];
    if (job) {
      /**
       * 修改后cron表达式
       */
      const cron = scheduleRecord.cron.join(' ');// 正式
      // let cron2 = ['*/5', '*', '*', '*', '*', '*'].join(' ');// 测试
      schedule.rescheduleJob(job, cron);

    } else {
      await this.setSchedule(scheduleRecord);
    }
  }
  /**
   * 初始化定时器列表
   * @param {*} ctx 上下文
   */
  async initScheduleList(ctx) {
    const model = ctx.model.ScheduleRecord;
    const scheduleRecordList = await model.findAll({ raw: true });
    scheduleRecordList.forEach(async scheduleRecord => {
      if (scheduleRecord.state) {
        await this.setSchedule(scheduleRecord);
      }
    });
  }
}

module.exports = AppBootHook;

// module.exports = app => {
//   app.beforeStart(async () => {
//       // 从配置中心获取 MySQL 的配置
//       // { host: 'mysql.com', port: '3306', user: 'test_user', password: 'test_password', database: 'test' }
//       await app.model.sync({ force: true });
//   });
// };
