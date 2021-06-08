// @ts-ignore
const STATUS_CODE = require('./statusCode')

module.exports = {
  /**
   * 响应数据处理函数
   */
  getInfo: ({ code = 0, msg = '', data = null }) => {
    code = code || STATUS_CODE.errCode
    msg = msg || STATUS_CODE[code] || STATUS_CODE.errMsg
    return { code, msg, data }
  }
}
