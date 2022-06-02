/**
 * 角色管理
 */
const CommonBaseService = require('./commonBaseSvc')
// const { Op } = require('sequelize')

module.exports = class TodoNodeSvc extends CommonBaseService {
  constructor(ctx) {
    super(ctx)
    this.model = this.ctx.model.TodoNode
  }
  /**
   * 添加待办节点
   * @param {any} obj 任务
   * @return {Promise<any>} 待办节点
   */
  async addTodoNode(obj) {
    obj.id = this.getId('TONO')
    obj.creator = 'YSHI'
    return this.model.create(obj).then(d => d.toJSON())
  }
  /**
   * 批量保存待办节点
   * @param {*} objList 待办节点列表
   * @return {Promise<any[]>} 待办节点列表
   */
  async batchTodoNodeList(objList) {
    const objArray = objList.map((obj, i) => {
      obj.id = this.getId('TONO')
      obj.sort = i
      return obj
    })
    return await this.batchAdd(objArray)
  }
  async saveTodoNode(obj) {
    let data = null
    if (!obj.id) {
      data = await this.addTodoNode(obj)
    } else {
      data = await this.update(obj)
    }
    return { code: 2000, data }
  }

  async saveAllTodoNode(objList) {
    await this.model.destroy()
    let data = await this.batchTodoNodeList(objList)
    data = data.sort((todoNode1, todoNode2) => todoNode1.sort - todoNode2.sort)
    return { code: 2000, data }
  }
  // /**
  //  * 获取所有任务节点
  //  * @param {string} type 任务类型
  //  */
  async getAllTodoNode() {
    const data = await this.getList(null, { sort: ['sort', 'ASC'] })
    return { code: 2000, data }
  }
  async getAllTodoNodeMap() {
    const data = await this.getList()
    const allTodoNodeMap = new Map()
    data.forEach(todoNode => {
      allTodoNodeMap.set(todoNode.name, todoNode.alias || todoNode.title)
    })
    return allTodoNodeMap
  }
}
