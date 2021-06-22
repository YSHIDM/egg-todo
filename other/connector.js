const DataLoader = require('dataloader')

class CommonConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.user = ctx.state.user
    this.service = this.ctx.service.commonSvc
    if (this.user) {
      this.agentId = this.user.agentId
    }
    this.getUserNameByUserIdLoader = new DataLoader(this.getUserNamesByIds.bind(this))
    this.getUserAvatarByUserIdLoader = new DataLoader(this.getUserAvatarsByUserIds.bind(this))
    // this.getUserByUserIdLoader = new DataLoader(this._getUserByUserId.bind(this));
    this.getDeptNameByIdLoader = new DataLoader(this.getDeptNamesByIds.bind(this))
    this.getDeptNameListByIdListLoader = new DataLoader(this.getDeptNamesListByIdsList.bind(this))
    this.getCustNameByIdLoader = new DataLoader(this.getCustNamesByIds.bind(this))
    this.getTemplateNameByIdLoader = new DataLoader(this.getTemplateNamesByIds.bind(this))
    this.getDocNameByIdLoader = new DataLoader(this.getDocNamesByIds.bind(this))
    this.getRoleNameByIdLoader = new DataLoader(this.getRoleNamesByIds.bind(this))
    this.getProductNameListByIdListLoader = new DataLoader(this.getProductNamesListByIdsList.bind(this))
    this.getProductNameByIdLoader = new DataLoader(this.getProductNamesByIds.bind(this))
    this.getCapitalPoolNameByIdLoader = new DataLoader(this.getCapitalPoolNamesByIds.bind(this))
  }
  // dataloader
  /**
   * 捕获异常统一接口
   * @param {string} func service 方法
   * @param {any[]} params 参数数组
   * @return {Promise<any>} 返回值
   */
  async catchDataLoaderError(func, params) {
    return this.service.catchDataLoaderError(func, params)
  }
  /**
   * 根据成员id列表查询成员名称列表
   * @param {string[]} userIds 成员id列表
   * @return {Promise<any>} 返回值
   */
  async getUserNamesByIds(userIds) {
    return this.catchDataLoaderError('getUserNamesByIds', [{ userIds }])
  }
  /**
   * 根据成员 id 查询成员name
   * @param {string} userId 成员id
   * @return {Promise<any>} 返回值
   */
  async getUserNameByUserId(userId) {
    if (!userId) {
      return null
    }
    return this.getUserNameByUserIdLoader.load(userId).catch(e => {
      this.getUserNameByUserIdLoader.clear(userId)
      return e
    })
  }
  /**
   * 根据成员id列表查询成员头像列表
   * @param {string[]} userIds 成员id列表
   * @return {Promise<any>} 返回值
   */
  async getUserAvatarsByUserIds(userIds) {
    return this.catchDataLoaderError('getUserAvatarsByUserIds', [{ userIds }])
  }
  /**
   * 根据成员 id 查询成员头像
   * @param {string} userId 成员id
   * @return {Promise<any>} 返回值
   */
  async getUserAvatarByUserId(userId) {
    if (!userId) {
      return null
    }
    return this.getUserAvatarByUserIdLoader.load(userId).catch(e => {
      this.getUserAvatarByUserIdLoader.clear(userId)
      return e
    })
  }
  /**
   * 按部门 id 列表查询部门名称列表
   * @param {string[]} deptIds 部门 id
   * @return {Promise<any>} 返回值
   */
  async getDeptNamesByIds(deptIds) {
    return this.catchDataLoaderError('getDeptNamesByIds', [{ deptIds }])
  }
  /**
   * 按部门 id 查询部门名称
   * @param {string} deptId 部门 id
   * @return {Promise<any>} 返回值
   */
  async getDeptNameById(deptId) {
    if (!deptId) {
      return null
    }
    return this.getDeptNameByIdLoader.load(deptId).catch(e => {
      this.getDeptNameByIdLoader.clear(deptId)
      return e
    })
  }
  /**
   * 按部门 id 数组列表查询部门名称数组列表
   * @param {Array<string[]>} deptIdsList 部门 id 数组列表
   * @return {Promise<any>} 返回值
   */
  async getDeptNamesListByIdsList(deptIdsList) {
    return this.catchDataLoaderError('getDeptNamesListByIdsList', [{ deptIdsList }])
  }
  /**
   * 按部门 id 列表查询部门名称列表
   * @param {any} deptIdList 部门 id 列表
   * @return {Promise<any>} 返回值
   */
  async getDeptNameListByIdList(deptIdList) {
    if (!deptIdList) {
      return null
    }
    return this.getDeptNameListByIdListLoader.load(deptIdList).catch(e => {
      this.getDeptNameListByIdListLoader.clear(deptIdList)
      return e
    })
  }
  /**
   *  按客户 id 列表查询客户名称列表
   * @param {string} custIds 客户 id
   * @return {Promise<any>} 返回值
   */
  async getCustNamesByIds(custIds) {
    return this.catchDataLoaderError('getCustNamesByIds', [custIds])
  }
  /**
   *  按客户 id 查询客户名称
   * @param {string} custId 客户 id
   * @return {Promise<any>} 返回值
   */
  async getCustNameById(custId) {
    if (!custId) {
      return null
    }
    return this.getCustNameByIdLoader.load(custId).catch(e => {
      this.getCustNameByIdLoader.clear(custId)
      return e
    })
  }
  /**
   * 按模板 id 列表查询模板名称列表
   * @param {string} templateIds 模板 id
   * @return {Promise<any>} 返回值
   */
  async getTemplateNamesByIds(templateIds) {
    return this.catchDataLoaderError('getTemplateNamesByIds', [templateIds])
  }
  /**
   * 按模板 id 查询模板名称
   * @param {string} templateId 模板 id
   * @return {Promise<any>} 返回值
   */
  async getTemplateNameById(templateId) {
    if (!templateId) {
      return null
    }
    return this.getTemplateNameByIdLoader.load(templateId).catch(e => {
      this.getTemplateNameByIdLoader.clear(templateId)
      return e
    })
  }
  async getDocNamesByIds(docIds) {
    return this.catchDataLoaderError('getDocNamesByIds', [docIds])
  }
  async getDocNameById(docId) {
    if (!docId) {
      return null
    }
    return this.getDocNameByIdLoader.load(docId).catch(e => {
      this.getDocNameByIdLoader.clear(docId)
      return e
    })
  }
  async getRoleNamesByIds(roleIds) {
    return this.catchDataLoaderError('getRoleNamesByIds', [roleIds])
  }
  async getRoleNameById(roleId) {
    if (!roleId) {
      return null
    }
    return this.getRoleNameByIdLoader.load(roleId).catch(e => {
      this.getRoleNameByIdLoader.clear(roleId)
      return e
    })
  }

  /**
   * 按产品 id 二维数组查询产品名称二维数组
   * @param {Array<string[]>} productIdsList 产品 id 二维数组
   * @return {Promise<any>} 返回值
   */
  async getProductNamesListByIdsList(productIdsList) {
    return this.catchDataLoaderError('getProductNamesListByIdsList', [productIdsList])
  }
  /**
   * 按产品 id 列表查询产品名称列表
   * @param {Array<string[]>} productIdList 产品 id 列表
   * @return {Promise<any>} 返回值
   */
  async getProductNameListByIdList(productIdList) {
    if (!productIdList) {
      return null
    }
    return this.getProductNameListByIdListLoader.load(productIdList).catch(e => {
      this.getProductNameListByIdListLoader.clear(productIdList)
      return e
    })
  }
  /**
   * 按产品 id 列表查询产品名称列表
   * @param {string[]} productIds 产品版本 id 列表
   * @return {Promise<any>} 返回值
   */
  async getProductNamesByIds(productIds) {
    return this.catchDataLoaderError('getProductNamesByIds', [productIds])
  }
  /**
   * 按产品 id 列表查询产品名称列表
   * @param { string[]} productId 产品 id
   * @return {Promise<any>} 返回值
   */
  async getProductNameById(productId) {
    if (!productId) {
      return null
    }
    return this.getProductNameByIdLoader.load(productId).catch(e => {
      this.getProductNameByIdLoader.clear(productId)
      return e
    })
  }
  /**
   * 按资金池 id 列表查询资金池名称列表
   * @param {string[]} capitalPoolIds 资金池 id 列表
   * @return {Promise<any>} 返回值
   */
  async getCapitalPoolNamesByIds(capitalPoolIds) {
    return this.catchDataLoaderError('getCapitalPoolNamesByIds', [capitalPoolIds])
  }
  /**
   * 按资金池 id 查询资金池名称
   * @param {string} capitalPoolId 资金池 id
   * @return {Promise<any>} 返回值
   */
  async getCapitalPoolNameById(capitalPoolId) {
    if (!capitalPoolId) {
      return null
    }
    return this.getCapitalPoolNameByIdLoader.load(capitalPoolId).catch(e => {
      this.getCapitalPoolNameByIdLoader.clear(capitalPoolId)
      return e
    })
  }
  // dataloader end

  /**
   * 捕获异常统一接口
   * @param {string} func service 方法
   * @param {any[]} params 参数数组
   * @return {Promise<any>} 返回值
   */
  async catchError(func, params = []) {
    return this.service.catchError('commonSvc', func, params)
  }
  /**
   * 按分页查询
   * @param  {...any} params 参数数组
   * @return {Promise<any>} 返回值
   */
  async getPage(...params) {
    return this.catchError('getPage', params)
  }
}

module.exports = CommonConnector
