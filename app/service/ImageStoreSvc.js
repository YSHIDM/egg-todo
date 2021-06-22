
const CommonBaseService = require('./commonBaseSvc')
const { QueryTypes } = require('sequelize')

module.exports = class ImageStoreSvc extends CommonBaseService {
  constructor(ctx) {
    super(ctx)
    this.model = this.ctx.model.ImageStore
  }
  /**
   * 批量记录图片文件信息
   * @param {Array} records 图片信息数组
   * @return {Promise<any[]>} 批量保存图片信息
   */
  async bulkCreate(records) {
    records = records.map(obj => {
      obj.id = this.getId('IMG')
      return obj
    })

    return await this.batchAdd(records)
  }
  /**
   * 记录图片文件信息
   * @param {any} imageInfo 图片信息
   * @return {Promise<any>} 保存图片信息
   */
  async saveImageInfo(imageInfo) {
    imageInfo.id = this.getId('IMG')
    await this.model.create(imageInfo)
    return this.byPk(imageInfo.id)
  }
  /**
   * 按外键查询图片信息
   * @param {string} foreignKey 外键
   * @param {any} sourceType 来源类型
   * @return {Promise<any[]>} 图片信息列表
   */
  async getImageByForeign(foreignKey, sourceType) {
    return this.model.findAll({
      where: {
        foreignKey,
        sourceType,
      },
    })
  }
  /**
   * 修改文件信息
   * @param {any} imageInfo 图片信息
   * @return {Promise<any>} 图片信息
   */
  async uploadImageByForeignKey(imageInfo) {
    return this.model.update(imageInfo, {
      where: {
        id: imageInfo.id,
      },
    })
  }
  // /**
  //    * 按时间分组获取文件大小及上传日期
  //    * @param {string} unit 时间单位
  //    * 支持 century, day, decade, dow, doy, epoch, hour, isodow, isoyear,
  //    * microseconds, millennium, milliseconds, minute, month, quarter,
  //    * second, timezone, timezone_hour, timezone_minute, week, year
  //    * @param {string} start 开始时间
  //    * @param {string} end 结束时间
  //    * @param date 上传日期，返回字段名称，默认：date
  //    * @param size 分组文件大小，返回字段名称，默认：size
  //    */
  async getGroupByDate(unit, start, end, date = 'date', size = 'size') {
    const sql = `SELECT date_part('${unit}', updated_at) AS ${date}, sum(size) AS ${size}
        FROM image_store
        where updated_at BETWEEN '${start}' and date'${end}'
        GROUP BY ${date} ORDER BY ${date} asc`
    return this.model.query(sql, { type: QueryTypes.SELECT })
  }
  // /**
  //  * 按上传日期查询
  //  * @param date 上传日期
  //  */
  async getImageByUpdatedAt(date) {
    const sql = `SELECT "id", "foreign_key" AS "foreignKey",
        "source_type" AS "sourceType", "filename", "size", "url", "path",
        "creator", "created_at" AS "createdAt", "modifier",
        "updated_at" AS "updatedAt" FROM "image_store" AS "imageStore"
        where date(updated_at) = '${date}'`
    return this.model.query(sql, { type: QueryTypes.SELECT })
  }
}
