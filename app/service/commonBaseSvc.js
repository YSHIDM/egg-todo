/**
 * 公共service类
 */
const { Op } = require('sequelize');
const { Service } = require('egg');

module.exports = class CommonBaseService extends Service {
  constructor(ctx) {
    super(ctx);
    this.STATUS_CODE = this.config.STATUS_CODE;
    this.okCode = this.STATUS_CODE.SUCCESS.COMMON.OK.code;
  }
  /**
   * 按 id 查询
   * @param id 主键
   */
  async byPk(id) {
    const record = await this.model.findByPk(id, { raw: true })
    return record;
  }
  /**
   * 按条件查询数据
   * @param {any} where 条件
   * @returns {Promise<any>}
   */
  async getData(where = void 0) {
    return await this.model.findOne({ where }).then(d => {
      if (!d) {
        return null;
      }
      return d.toJSON();
    });
  }
  /**
   * 按条件查询数据列表
   * @param {any} where 条件
   * @param {any} extraOptions 用于排序
   * @returns {Promise<any[]>}
   */
  async getDataList(where = void 0, extraOptions = void 0) {
    const order = [];
    if (extraOptions) {
      const { sort } = extraOptions;
      if (sort) {
        order.push(sort)
      }
    }
    order.push(['createdAt', 'DESC'])
    const query = {
      raw: true,
      order,
    };
    if (where) {
      query['where'] = where;
    }
    const list = await this.model.findAll(query);
    return list;
  }
  /**
   * 修改记录
   * @param obj 新的记录
   */
  async update(obj) {
    obj.modifier = this.ctx.state.user.userId;
    // obj.updatedAt = new Date();
    return await this.model.update(obj, {
      where: {
        id: {
          [Op.eq]: obj.id,
        },
      },
      // individualHooks: true,
      returning: true,
    }).then(dcs => {
      const dcsInfo = dcs[1].map(i => i.toJSON())
      return dcsInfo[0];
    });
  }
  /**
   * 按条件删除记录
   * @param where 条件
   */
  async delete(where) {
    if (!where || Object.keys(where).length === 0) {
      return
    }
    return await this.model.destroy({
      where,
    });
  }
  getId(prefix) {
    return this.app['genId'](prefix);
  }
}
