class TodoNodeConnector {
  constructor(ctx) {
    this.ctx = ctx
  }
  /**
   * 捕获异常统一接口
   * @param {string} func service 方法
   * @param {any[]} params 参数数组
   * @return {Promise<any>} 接口返回值
   */
  async catchError(func, params = []) {
    return this.ctx.service.commonSvc.catchError('todoNodeSvc', func, params)
  }
  /**
   * 保存任务节点列表
   * @param  {...any} params 参数
   * @return {Promise<any>} 接口返回值
   */
  async saveAllTodoNode(...params) {
    return this.catchError('saveAllTodoNode', params)
  }
  /**
   * 获取所有任务节点
   * @return {Promise<any>} 接口返回值
   */
  async getAllTodoNode() {
    return this.catchError('getAllTodoNode')
  }
}
module.exports = TodoNodeConnector
