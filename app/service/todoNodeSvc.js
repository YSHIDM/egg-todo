/**
 * 角色管理
 */
const CommonBaseService = require('./commonBaseSvc')
// const { Op } = require('sequelize')

module.exports = class TodoNodeSvc extends CommonBaseService {
  /**
   * 添加待办节点
   * @param {any} obj 任务
   * @return {Promise<any>} 待办节点
   */
  async addTodoNode(obj) {
    const model = this.ctx.model.TodoNode
    obj.id = this.getId('TONO')
    // obj.creator = this.ctx.state.user.userId;
    return model.create(obj).then(d => d.toJSON())
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
  /**
   * 修改任务
   * @param {any} obj 任务
   * @return {Promise<any>} 待办节点
   */
  async updateTodoNode(obj) {
    const model = this.ctx.model.TodoNode
    // obj.modifier = this.ctx.state.user.userId;
    await model.update(obj, {
      where: {
        id: obj.id,
      },
    })
    return this.byPk(obj.id)
  }
  // /**
  //  * 按主键查询审批数据
  //  * @param id 主键
  //  */
  async byPk(id) {
    const model = this.ctx.model.TodoNode
    let todoNode = await model.findByPk(id)
    if (todoNode) {
      todoNode = todoNode.toJSON()
    } else {
      todoNode = null
    }
    return todoNode
  }
  /**
   * 查询所有工作流程--按名称模糊查询
   * @param {any} where 条件
   * @return {Promise<any[]>} 待办节点列表
   */
  async getTodoNodeList(where) {
    const model = this.ctx.model.TodoNode
    const todoNodeList = await model.findAll({
      where,
      order: [['createdAt', 'ASC']],
    })
    return await todoNodeList.map(d => d.toJSON())
  }
  /**
   * 删除待办结点
   * @param {any} where 条件
   * @return {Promise<{ code: number;}>} 返回码
   */
  async deleteTodoNode(where = {}) {
    const model = this.ctx.model.TodoNode
    await model.destroy({ where })
    return { code: 2000 }
  }

  async saveAllTodoNode(objList) {
    await this.deleteTodoNode()
    let data = await this.batchTodoNodeList(objList)
    data = data.sort((todoNode1, todoNode2) => todoNode1.sort - todoNode2.sort)
    return { code: 2000, data }
  }
  // /**
  //  * 获取所有任务节点
  //  * @param {string} type 任务类型
  //  */
  async getAllTodoNode() {
    const data = await this.getTodoNodeList()
    return { code: 2000, data }
  }
  async getAllTodoNodeMap() {
    const data = await this.getTodoNodeList()
    const allTodoNodeMap = new Map()
    data.forEach(todoNode => {
      allTodoNodeMap.set(todoNode.name, todoNode.alias || todoNode.title)
    })
    return allTodoNodeMap
  }
}
