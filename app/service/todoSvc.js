// TODO: 接口返回值有问题
const CommonBaseService = require('./commonBaseSvc')
// const { Op } = require('sequelize')

module.exports = class TodoSvc extends CommonBaseService {
  constructor(ctx) {
    super(ctx)
    this.model = this.ctx.model.Todo
  }
  /**
   * 添加任务
   * @param {any} obj 任务
   * @return {Promise<any>} 待办节点
   */
  async addTodo(obj) {
    obj.id = this.getId('TODO')
    obj.index = 0
    obj.node = 'planning'
    obj.isArchive = false
    obj.isClose = false
    obj.history = [{
      index: obj.index,
      node: obj.node,
      time: new Date(),
    }]
    obj.creator = 'YSHI'
    return this.model.create(obj).then(d => d.toJSON())
  }

  /**
   * 保存任务
   * @param {any} obj 待办任务
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async saveTodo(obj) {
    let todo = null
    if (!obj.id) {
      todo = await this.addTodo(obj)
    } else {
      todo = await this.update(obj)
    }
    return { code: 2000, data: todo }
  }
  /**
   * 获取使用中的任务列表
   * @return {Promise<{code: number, data: any[]}>} 待办任务列表
   */
  async getAllTodo() {
    const data = await this.getList()
    return { code: 2000, data }
  }
  /**
   * 按 id 获取待办
   * @param {string} id 待办 id
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async getTodoById(id) {
    const data = await this.byPk(id)
    return { code: 2000, data }
  }
  /**
   * 按 id 删除任务
   * @param {string} id 任务 id
   * @return {Promise<{code: number}>} 删除
   */
  async deleteTodoById(id) {
    await this.delete({ id })
    return { code: 2000 }
  }
  /**
   * 任务执行到下一步
   * @param {string} id 任务 id
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async todoNext(id) {
    const nextNode = {
      planning: 'inProgress',
      inProgress: 'testing',
      testing: 'done',
    }
    let where = {}
    const todo = await this.byPk(id)
    if (!nextNode[todo.node]) {
      return { code: 8000, data: null }
    }
    const node = nextNode[todo.node]
    todo.history.push({ node, time: new Date() })
    where = { id, node, history: todo.history }
    const data = await this.update(where)
    return { code: 2000, data }
  }
  /**
   * 完成任务
   * @param {string} id 任务 id
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async todoDone(id) {
    const node = 'done'
    const todo = await this.byPk(id)
    todo.history.push({ node, time: new Date() })
    const data = await this.update({ id, node, history: todo.history })
    return { code: 2000, data }
  }
  /**
   * 关闭任务
   * @param {string} id 任务ID
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async closeTodo(id) {
    const data = await this.update({ id, isClose: true })
    return { code: 2000, data }
  }
  /**
   * 还原任务
   * @param {string} id 任务ID
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async restoreTodo(id) {
    const data = await this.update({ id, isClose: false })
    return { code: 2000, data }
  }
  /**
   * 归档任务
   * @param {string} id 任务ID
   * @return {Promise<{code: number, data: any}>} 待办任务
   */
  async todoArchive(id) {
    const data = await this.update({ id, isArchive: true })
    return { code: 2000, data }
  }
}
