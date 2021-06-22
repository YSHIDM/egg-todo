const { create, all } = require('mathjs')

const math = create(all)
math.config({ number: 'BigNumber' })

module.exports = {
  /**
   * 计算数学表达式
   * @param {string} expression 数学表达式
   * @param {number} decimalLength 小数点长度
   * @return {string} 数字字符串
   */
  evaluate: (expression, decimalLength = 2) => math.round(math.evaluate(expression), decimalLength).toString(),
}
