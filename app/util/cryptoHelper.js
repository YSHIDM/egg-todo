const crypto = require('crypto');

module.exports = {
  md5(data){
    // 创建一个hash对象
    const md5 = crypto.createHash('md5');

    // 往hash对象中添加摘要内容
    md5.update(data);

    // 使用 digest 方法输出摘要内容，不使用编码格式的参数 其输出的是一个Buffer对象

    // 使用编码格式的参数，输出的是一个字符串格式的摘要内容
    return md5.digest('hex');
  },
};
