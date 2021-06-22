const { format } = require('util')
const moment = require('moment')
const { nanoid, customAlphabet } = require('nanoid')
const customAlphabets = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
nanoid()
module.exports = {
  /**
   * 数据库主键生成器
   * @param {string} prefix 前缀
   * @return {string} 主键
   */
  genId(prefix) {
    prefix = prefix.toString()
    const customNanoid = customAlphabet(customAlphabets, 25 - prefix.length)
    return format('%s%s', prefix, customNanoid())
  },
  /**
   * 当日累加主键
   * @param {string} prefix 前缀
   * @param {number} fillSize 填充位数,默认为2位
   * @return {Promise<string>} 主键
   */
  async genIncrId(prefix = '', fillSize = 2) {
    const today = moment().format('YYYYMMDD')
    const cacheK = format('%s_ID', prefix)
    const value = await this.redis.hget('GEN_INCR', cacheK)
    const dayAndNum = value?.split('-')
    const day = today
    let num = ''
    if (!!dayAndNum && dayAndNum[0] === today) {
      num = dayAndNum[1]
    } else {
      num = '1'
    }
    num = (Number(num) + 1).toString()
    await this.redis.hset('GEN_INCR', cacheK, day + '-' + num)
    return format('%s%s%s', prefix, day, num.toString().padStart(fillSize, '0'))
  },
}
