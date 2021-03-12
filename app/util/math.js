const { create, all } = require('mathjs');
const math = create(all);
math.config({ number: 'BigNumber' });

module.exports = {
  /**
   * 计算数学表达式
   * @param expression 数学表达式
   */
  evaluate: (expression, n = 2) => math.round(math.evaluate(expression), n).toString(),
}
