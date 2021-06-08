const CommonBaseService = require('./commonBaseSvc');
// const { Op } = require('sequelize')

module.exports = class TodoNodeSvc extends CommonBaseService {
  constructor(ctx) {
    super(ctx);
    this.CONSTANT = this.app.constant.common;
  }
  /**
   * 捕获异常统一接口
   * @param {string} ser service 名称
   * @param {string} func service 方法
   * @param {array} params 参数数组
   * @returns {Promise<any>} aa
   */
  async catchError(ser, func, params = []) {
    let result = {};
    try {
      const { code, data, msg } = await this.service[ser][func](...params);

      result = { code, msg, data };
    } catch (err) {
      console.error(err);
      this.ctx.logger.error(err);
      if (err.code) {
        result = err;
      }
      result = { code: this.STATUS_CODE.INTERNAL.RES.code };
    }
    return result;
  }
  /**
   * 捕获 DataLoader 异常统一接口
   * @param service service 名称
   * @param func service 方法
   * @param params 参数数组
   */
  async catchDataLoaderError(service, func, params = []) {
    let result = {};
    try {
      result = await this.service[service][func](...params);
    } catch (err) {
      console.error(err);
      this.ctx.logger.error(err);
      if (err.code) {
        result = err;
      }
      result = { code: this.STATUS_CODE.INTERNAL.RES.code };
    }
    return result;
  }
  /**
   * 按名称获取节点标题
   * @param {string} names 节点名称
   */
  async getTodoNodeTitlesByNames(names) {
    const allTodoNodeMap = await this.service.todoNodeSvc.getAllTodoNodeMap();
    const titles = names.map(name => allTodoNodeMap.get(name));
    return titles;
  }
  async getTodoNodeTitlesByNames(names) {
    const allTodoNodeMap = await this.service.todoNodeSvc.getAllTodoNodeMap();
    const titles = names.map(name => allTodoNodeMap.get(name));
    return titles;
  }
  // /**
  //  * 分页查询总接口
  //  * @param {string} type 分页查询类型
  //  * @param {{ search: string; filter: any; pageSize: number; currentPage: number }} query 分页查询添加: search 搜索框, filter 过滤条件, pageSize 每页条数, currentPage 当前页
  //  * @returns {Promise<any>}
  //  */
  async getPage(type, query = void 0) {
    // 特殊情况
    // if ('cust1') {
    //   this.service.CustSvc.getByPage1({})
    // }
    let service = '';
    switch (type) {
      case 'cust':
        service = 'custSvc';
        break;
      case 'asset':
        service = 'assetSvc';
        break;
      case 'template':
        service = 'templateSvc';
        break;
      case 'memo':
        service = 'memoSvc';
        break;
      case 'notice':
        service = 'noticeSvc';
        break;
      case 'assess':
        service = 'assessSvc';
        break;
      case 'product':
        service = 'productSvc';
        break;
      case 'quotaContract':
        service = 'quotaContractSvc';
        break;
      case 'quotaCredit':
        service = 'quotaCreditSvc';
        break;
      default:
        break;
    }
    let search = '';
    let filter = {};
    let pageSize = 10;
    let currentPage = 1;
    if (query) {
      const inputFilter = query.filter;
      if (!!inputFilter && typeof inputFilter === 'string') {
        try {
          const obj = JSON.parse(inputFilter);
          if (typeof obj === 'object' && obj) {
            filter = obj;
          }
        } catch (e) {
          console.error('JSON 格式错误', e);
          return { code: this.STATUS_CODE.ERROR.COMMON.FILTER_NOT_JSON.code };
        }
      }
      search = query.search;
      pageSize = query.pageSize;
      currentPage = query.currentPage;
    }

    // 该接口需要给每条数据添加 type 字段, 以判断该数据的类型
    // 参考 'CustSvc.ts' getPage方法
    return await this.ctx.service[service].getPage({ search, filter, pageSize, currentPage });
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
        const dt = d.toJSON();
        dt.rowType = rowType;
        return dt;
      });
      const count = ds.count;
      const totalPages = Math.ceil(count / pageSize);
      return { rows, count, currentPage, totalPages };
    };
  }
};
