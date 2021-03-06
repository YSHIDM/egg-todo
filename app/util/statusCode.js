module.exports = {
  errCode: 400,
  errMsg: '请求异常',
  // 1xx：表示普通信息，没有特殊含义
  1001: '',

  // 2xx：表示服务器响应成功
  2000: '成功',

  // 3xx：表示重定向
  301: '永久重定向',
  302: '临时重定向',
  304: '使用缓存（服务器没有更新过）',

  // 4xx：无法访问
  400: '请求异常',
  403: '权限不足，无法访问',
  404: '资源找不到',

  // 5xx ：服务器有错
  500: 'Internal Server Error',
  // 500: '服务器端代码有错',
  502: '网关错误',
  503: '服务器已崩溃',

  // ==========================
  // 公用的一些错误提示
  5001: '名称不能重复',
  5002: '接口字段错误',
  5003: '文件上传失败',

  // ==========================
  // 上传文件
  7011: '上传文件需要外键（foreignKey）和图片来源（foreignType）',
  7012: '请上传图片类型文件',

  // todo 任务
  8000: '任务已经完成',
}
