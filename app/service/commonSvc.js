const { Service } = require('egg')
const { format } = require('util')
const { customAlphabet } = require('nanoid')
const moment = require('moment')

module.exports = class TodoNodeSvc extends Service {
  constructor(ctx) {
    super(ctx)
    this.CONSTANT = this.app['constant'].common
    this.STATUS_CODE = this.app.config.STATUS_CODE;
  }
  /**
   * 捕获异常统一接口
   * @param {string} ser service 名称
   * @param {string} func service 方法
   * @param {Array} params 参数数组
   * @return {Promise<any>} 返回值
   */
  async catchError(ser, func, params = []) {
    let result = {}
    try {
      const { code, data, msg } = await this.service[ser][func](...params)

      result = { code, msg, data }
    } catch (err) {
      console.error(err)
      this.ctx.logger.error(err)
      if (err.code) {
        result = err
      } else {
        result = { code: this.STATUS_CODE.INTERNAL.RES.code }
      }
    }
    return result
  }
  /**
   * 捕获 DataLoader 异常统一接口
   * @param {string} service service 名称
   * @param {string} func service 方法
   * @param {Array} params 参数数组
   * @return {Promise<any>} 返回值
   */
  async catchDataLoaderError(service, func, params = []) {
    let result = {}
    try {
      result = await this.service[service][func](...params)
    } catch (err) {
      console.error(err)
      this.ctx.logger.error(err)
      if (err.code) {
        result = err
      } else {
        result = { code: this.STATUS_CODE.INTERNAL.RES.code }
      }
    }
    return result
  }
  /**
   * 按名称列表获取节点标题列表
   * @param {string} name 节点名称
   * @return {Promise<string[]>} 标题列表
   */
  async getTodoNodeTitleByName(name) {
    const allTodoNodeMap = await this.service.todoNodeSvc.getAllTodoNodeMap()
    return allTodoNodeMap.get(name)
  }
  // /**
  //  * 分页查询总接口
  //  * @param {string} type 分页查询类型
  //  * @param {{ search: string; filter: any; pageSize: number; currentPage: number }} query 分页查询添加: search 搜索框, filter 过滤条件, pageSize 每页条数, currentPage 当前页
  //  * @return  {Promise<any>}
  //  */
  async getPage(type, query = void 0) {
    // 特殊情况
    // if ('cust1') {
    //   this.service.CustSvc.getByPage1({})
    // }
    const service = type + 'Svc'
    let search = ''
    let filter = {}
    let pageSize = 10
    let currentPage = 1
    if (query) {
      const inputFilter = query.filter
      if (!!inputFilter && typeof inputFilter === 'string') {
        try {
          const obj = JSON.parse(inputFilter)
          if (typeof obj === 'object' && obj) {
            filter = obj
          }
        } catch (e) {
          console.error('JSON 格式错误', e)
          return { code: this.STATUS_CODE.ERROR.COMMON.FILTER_NOT_JSON.code }
        }
      }
      search = query.search
      pageSize = query.pageSize
      currentPage = query.currentPage
    }

    // 该接口需要给每条数据添加 type 字段, 以判断该数据的类型
    // 参考 'CustSvc.ts' getPage方法
    return this.ctx.service[service].getPage({ search, filter, pageSize, currentPage })
  }
  // /**
  //  * 分页查询处理
  //  * @param rowType 数据的类型,既模块类型
  //  * @param pageSize 每页数量
  //  * @param currentPage 当前页码
  //  */
  getPageHandler(rowType, pageSize, currentPage) {
    return ds => {
      const rows = ds.rows.map(d => {
        const dt = d.toJSON()
        dt.rowType = rowType
        return dt
      })
      const { count } = ds
      const totalPages = Math.ceil(count / pageSize)
      return { rows, count, currentPage, totalPages }
    }
  }
  genId(alphabet) {
    return (prefix, length = 10) => {
      const prefixLength = prefix.length
      const customNanoid = customAlphabet(alphabet, length - prefixLength)
      return format('%s%s', prefix, customNanoid())
    }
  }
  async genIncrId(prefix = '', fillSize = 2) {
    const today = moment().format('YYYYMMDD')
    const cacheK = format('%s_ID', prefix)
    const value = await this.app.redis.hget('GEN_INCR', cacheK)
    const dayAndNum = value.split('-')
    const day = today
    let num = ''
    if (!!dayAndNum && dayAndNum[0] === today) {
      num = dayAndNum[1]
    } else {
      num = '1'
    }
    num = (Number(num) + 1).toString()
    await this.app.redis.hset('GEN_INCR', cacheK, day + '-' + num)
    return format('%s%s%s', prefix, day, num.toString().padStart(fillSize, '0'))
  }
}
