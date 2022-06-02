module.exports = {
  Mutation: {
    saveTodoNode(_root, { obj }, ctx) {
      return ctx.connector.todoNode.saveTodoNode(obj)
    },
    saveAllTodoNode(_root, { objArray }, ctx) {
      return ctx.connector.todoNode.saveAllTodoNode(objArray)
    },
  },
  Query: {
    getAllTodoNode(_root, _obj, ctx) {
      return ctx.connector.todoNode.getAllTodoNode()
    },
  },
}
