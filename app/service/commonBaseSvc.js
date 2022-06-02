/**
 * 公共service类
 */
const { Op } = require('sequelize')
const { Service } = require('egg')

module.exports = class CommonBaseService extends Service {
  constructor(ctx) {
    super(ctx)
    this.STATUS_CODE = this.config.STATUS_CODE
    this.okCode = this.STATUS_CODE.SUCCESS.COMMON.OK.code
    this.model = undefined
  }
  /**
   * 获取一个 id
   * @param {string} prefix id 前缀
   * @return {string} id
   */
  getId(prefix) {
    return this.service.commonSvc.genId('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz')(prefix)
  }
  /**
   * 批量新增
   * @param {any[]} objArray 数据列表
   * @return {Promise<any[]>} 批量保存的数据
   */
  async batchAdd(objArray) {
    return await this.model.bulkCreate(objArray)
      .then(data => data.map(d => d.toJSON()))
  }
  /**
   * 按 id 查询
   * @param {string} id 主键
   * @return {Promise<any>} model数据
   */
  byPk(id) {
    return this.model.findByPk(id, { raw: true })
  }
  /**
   * 按条件查询数据
   * @param {any} where 条件
   * @return {Promise<any>} model数据
   */
  async getData(where = void 0) {
    return this.model.findOne({ where })
      .then(d => d.toJSON())
  }
  /**
   * 按条件查询数据列表
   * @param {any} where 条件
   * @param {any} extraOptions 用于排序
   * @return {Promise<any[]>} model数据列表
   */
  async getList(where = void 0, extraOptions = void 0) {
    const order = []
    if (extraOptions) {
      const { sort } = extraOptions
      if (sort) {
        order.push(sort)
      }
    }
    order.push(['createdAt', 'DESC'])
    const query = {
      raw: true,
      order,
    }
    if (where) {
      query.where = where
    }
    return this.model.findAll(query)
  }
  /**
   * 修改记录
   * @param {any} obj 新的记录
   * @return {Promise<any>} model数据
   */
  async update(obj) {
    obj.modifier = 'YSHI'
    return this.model.update(obj, {
      where: {
        id: {
          [Op.eq]: obj.id,
        },
      },
      // individualHooks: true,
      returning: true,
    }).then(ds => ds[1].map(i => i.toJSON())[0])
  }
  /**
   * 按条件删除记录
   * @param {any} where 条件
   * @return {Promise<number>} model数据
   */
  async delete(where) {
    if (!where || Object.keys(where).length === 0) {
      return 0
    }
    return this.model.destroy({ where })
  }
  // /**
  //  * 包装 app.messenger.sendToAgent
  //  * @param action 事件名称
  //  * @param data 事件参数
  //  */
  sendToAgent(action, data) {
    this.app.messenger.sendToAgent(action, [data, this.ctx.state.user])
  }
}
