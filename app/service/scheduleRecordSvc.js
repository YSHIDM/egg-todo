const CommonBaseService = require('./commonBaseSvc')

module.exports = class ScheduleRecordSvc extends CommonBaseService {
  constructor(ctx) {
    super(ctx)
    this.okCode = 2000
    this.model = this.ctx.model.ScheduleRecord
  }
  /**
   * 添加定时器信息
   * @param {any} obj 定时器信息
   * @return {Promise<any>}定时器
   */
  async addScheduleRecord(obj) {
    obj.id = this.getId('SDR')
    obj.state = 1
    obj.creator = this.ctx.state.user.userId
    return this.model.create(obj).then(d => d.toJSON())
  }
  /**
   * 按id查询定时器信息
   * @param {any} id 定时器id
   * @return {Promise<any>} 定时器
   */
  async byPk(id) {
    return this.model.findByPk(id, { raw: true })
  }
  /**
   * 按条件查询定时器信息
   * @param {any} where 查询条件
   * @return {Promise<any>} 定时器
   */
  async getScheduleRecord(where) {
    let scheduleRecord = await this.model.findOne({ where })
    if (!scheduleRecord) {
      scheduleRecord = null
    } else {
      scheduleRecord = scheduleRecord.toJSON()
    }
    return scheduleRecord
  }
  // delete

  // service
  /**
   * 保存定时器
   * @param {any} obj 定时器信息
   * @return {Promise<any>} 定时器
   */
  async saveScheduleRecord(obj) {
    const scheduleRecord = await this.getScheduleRecord({ type: obj.type })
    let data
    if (scheduleRecord) {
      obj.id = scheduleRecord.id
      data = await this.update(obj)
    } else {
      data = await this.addScheduleRecord(obj)
    }
    this.app.messenger.sendToAgent('loadSchedule', data)
    return data
  }
  // /**
  //  * 针对消息设置的保存定时器消息
  //  * @param {any} obj 定时器消息
  //  * @return {Promise<{code: number; data: any;}>} 返回值
  //  */
  async saveScheduleRecordForMessage(obj) {
    const type = 'test' // this.ctx.app.config.DEFDOC_CONST.FixBackAndContract[obj.sourceId];
    obj.type = type
    obj.timeOffsets = obj.timeOffsets.map(to => {
      to.unit = 'days'
      return to
    })
    obj.cron = ['0', `${obj.cron[1]}`, `${obj.cron[0]}`, '*', '*', '*']
    if (obj.id) {
      const scheduleRecord = await this.byPk(obj.id)
      if (!scheduleRecord) {
        return { code: 15001, data: null }
      }
    }
    const data = await this.saveScheduleRecord(obj)
    data.cron = [data.cron[2], data.cron[1]]
    return { code: this.okCode, data }
  }
  // /**
  //  * 按来源id查询定时器信息
  //  * @param {string} sourceId 来源id
  //  * @return {Promise<{code: number; data: any;}>} 返回值
  //  */
  async getScheduleRecordBySourceId(sourceId) {
    const data = await this.getScheduleRecord({ sourceId })
    if (!data) {
      return { code: this.okCode, data: null }
    }
    data.cron = [data.cron[2], data.cron[1]]
    return { code: this.okCode, data }
  }
  // /**
  //  * 定时器立即执行
  //  * @param {string} sourceId 定时器来源 id,(固定类应用 id)
  //  * @return {ApiResult} 返回值
  //  */
  // async execSchedule(sourceId) {
  //   const scheduleRecord = await this.getScheduleRecord({ sourceId })
  //   const num = scheduleRecord ? await this.execCallback(scheduleRecord) : 0
  //   const msg = num ? `已成功发送${num}条` : '暂无符合要求数据！'
  //   return { code: this.okCode, msg }
  // }
  // /**
  //  * 执行定时器回调函数
  //  * @param scheduleRecord 定时器信息
  //  */
  // async execCallback(scheduleRecord) {
  //   // scheduleRecord.receiver = await this.service.userRoleSvc.getReceiversByIdentity(scheduleRecord.receiver);
  //   // let service;
  //   switch (scheduleRecord.type) {
  //   // case 'quotaLoanContract':
  //   //   service = this.service.quotaLoanContractSvc;
  //   //   break;
  //   case 'test':
  //     break
  //   case 'test2':
  //     break
  //   default:
  //     break
  //   }
  //   return 10
  //   // return  service.execSchedule(scheduleRecord);
  // }
}
