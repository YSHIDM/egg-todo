const moment = require('moment');
// const { GraphQLJSONObject } = require('graphql-type-json');
module.exports = {
  // JsonString: GraphQLJSON,
  Cust: {
    // 部门名称
    async deptName(root, _, ctx) {
      return await ctx.connector.common.getDeptNameById(root.deptId);
    },
    // 人员名称
    async userName(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.userId);
    },
    // 创建人
    async creator(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.creator);
    },
    // 修改人
    async modifier(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.modifier);
    },
    // 创建时间
    createdAt(root, _, _ctx) {
      return moment(new Date(root.createdAt)).format('YYYY-MM-DD HH:mm:ss');
    },
    // 修改时间
    updatedAt(root, _, _ctx) {
      return moment(new Date(root.updatedAt)).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  Asset: {
    // 部门名称
    async deptName(root, _, ctx) {
      return await ctx.connector.common.getDeptNameById(root.deptId)
    },
    // 人员名称
    async userName(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.userId)
    },
    // 客户名称
    async custName(root, _, ctx) {
      return await ctx.connector.common.getCustNameById(root.custId)
    },
    // 模板名称
    async templateName(root, _, ctx) {
      return await ctx.connector.common.getTemplateNameById(root.templateId)
    },
    // 关系名称
    async relationshipName(root, _, ctx) {
      return await ctx.connector.common.getDocNameById(root.relationshipWithCust)
    },
    // 创建人
    async creator(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.creator);
    },
    // 修改人
    async modifier(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.modifier);
    },
    // 创建时间
    createdAt(root, _, _ctx) {
      return moment(new Date(root.createdAt)).format('YYYY-MM-DD HH:mm:ss');
    },
    // 修改时间
    updatedAt(root, _, _ctx) {
      return root.modifier ? moment(new Date(root.updatedAt)).format('YYYY-MM-DD HH:mm:ss') : null;
    },
  },
  Template: {
    // 创建人
    async creator(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.creator);
    },
    // 修改人
    async modifier(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.modifier);
    },
    // 创建时间
    createdAt(root, _, _ctx) {
      return moment(new Date(root.createdAt)).format('YYYY-MM-DD HH:mm:ss');
    },
    // 修改时间
    updatedAt(root, _, _ctx) {
      return root.modifier ? moment(new Date(root.updatedAt)).format('YYYY-MM-DD HH:mm:ss') : null;
    },
  },
  Memo: {
    userId(root, _, ctx) {
      return root.creator;
    },
    async avatar(root, _, ctx) {
      return await ctx.connector.common.getUserAvatarByUserId(root.creator);
    },
    // 创建人
    async userName(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.creator);
    },
    // 创建人
    async creator(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.creator);
    },
    // 创建时间
    createdAt(root, _, _ctx) {
      return moment(new Date(root.createdAt)).format('YYYY-MM-DD HH:mm:ss');
    },
    // 修改人
    async modifier(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.modifier);
    },
    // 修改时间
    updatedAt(root, _, _ctx) {
      return root.modifier ? moment(new Date(root.updatedAt)).format('YYYY-MM-DD HH:mm:ss') : null;
    },
  },
  Product: {
    // 创建人
    async creator(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.creator);
    },
    // 修改人
    async modifier(root, _, ctx) {
      return await ctx.connector.common.getUserNameByUserId(root.modifier);
    },
  },
  Row: {
    __resolveType(obj) {
      // obj 是 rows 中的对象
      // 需要在对象的字段中加入 type 并返回
      // 参考 CustSvc.ts getPage 方法
      if (!obj.rowType) {
        throw '需要 type 字段判断数据类型'
      }
      return obj.rowType;
    },
  },
  Query: {
    // 根据主键查询
    async getPage(_root, { type, query }, ctx) {
      return await ctx.connector.common.getPage(type, query);
    },
  },
};
