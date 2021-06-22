class TodoConnector {
  constructor(ctx) {
    this.ctx = ctx
  }
  /**
   * 捕获异常统一接口
   * @param {string} func service 方法
   * @param {any[]} params 参数数组
   * @return {any} 接口返回值
   */
  async catchError(func, params = []) {
    return this.ctx.service.commonSvc.catchError('todoSvc', func, params)
  }
  /**
   * 保存任务
   * @param  {...any} params 参数
   * @return {any} 接口返回值
   */
  async saveTodo(...params) {
    return this.catchError('saveTodo', params)
  }
  /**
   * 获取使用中的任务列表
   * @return {any} 接口返回值
   */
  async getAllTodo() {
    return this.catchError('getAllTodo')
  }
  /**
   * 按 id 获取待办
   * @param  {...any} params 参数
   * @return {any} 接口返回值
   */
  async getTodoById(params) {
    return this.catchError('getTodoById', params)
  }
  /**
   * 按 id 删除任务
   * @param  {...any} params 参数
   * @return {any} 接口返回值
   */
  async deleteTodoById(...params) {
    return this.catchError('deleteTodoById', params)
  }
  /**
   * 任务执行到下一步
   * @param  {...any} params 参数
   * @return {any} 接口返回值
   */
  async todoNext(...params) {
    return this.catchError('todoNext', params)
  }
  /**
   * 完成任务
   * @param  {...any} params 参数
   * @return {any} 接口返回值
   */
  async todoDone(...params) {
    return this.catchError('todoDone', params)
  }
  /**
   * 废弃任务
   * @param  {...any} params 参数
   * @return {any} 接口返回值
   */
  async closeTodo(...params) {
    return this.catchError('closeTodo', params)
  }
  /**
   * 还原任务
   * @param  {...any} params 参数
   * @return {any} 接口返回值
   */
  async restoreTodo(...params) {
    return this.catchError('restoreTodo', params)
  }
  /**
   * 归档任务
   * @param  {...any} params 参数
   * @return {any} 接口返回值
   */
  async todoArchive(...params) {
    return this.catchError('todoArchive', params)
  }
}
module.exports = TodoConnector
