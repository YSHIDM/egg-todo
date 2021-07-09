const DataLoader = require('dataloader')

class CommonConnector {
  constructor(ctx) {
    this.ctx = ctx
    // this.user = ctx.state.user;
    this.service = ctx.service.commonSvc
    // if (!!this.user) {
    //   this.agentId = this.user.agentId;
    // }
    this.getTodoNodeTitleByNameLoader = new DataLoader(this.getTodoNodeTitlesByNames.bind(this))
  }
  /**
   * 捕获异常统一接口
   * @param {string} func service 方法
   * @param {any[]} params 参数数组
   * @return {Promise<any>} 接口返回值
   */
  async catchError(func, params) {
    return this.service.catchError('commonSvc', func, params)
  }

  // dataloader
  /**
   * 捕获异常统一接口
   * @param {string} func service 方法
   * @param {any[]} params 参数数组
   * @return {Promise<any>} 接口返回值
   */
  async catchDataLoaderError(func, params) {
    return this.service.catchDataLoaderError('commonSvc', func, params)
  }
  /**
   * 根据待办结点名称获取待办结点标题
   * @param {any[]} params 参数
   * @return {Promise<any>} 接口返回值
   */
  async getTodoNodeTitlesByNames(params) {
    return this.catchDataLoaderError('getTodoNodeTitlesByNames', params)
  }
  /**
   * 根据待办结点名称获取待办结点标题
   * @param {string} name 参数
   * @return {Promise<Error>} 接口返回值
   */
  async getTodoNodeTitleByName(name) {
    if (!name) {
      return null
    }
    return this.getTodoNodeTitleByNameLoader.load(name).catch(e => {
      this.getTodoNodeTitleByNameLoader.clear(name)
      return e
    })
  }
}

module.exports = CommonConnector
