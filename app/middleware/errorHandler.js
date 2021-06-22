const moment = require('moment')

const errorHandler = () => {
  return async (ctx, next) => {
    const { STATUS_CODE } = ctx.app.config
    let message
    let code
    try {
      const startTime = moment().valueOf()
      await next()
      // 请求日志
      const endTime = moment().valueOf()
      const time = endTime - startTime
      const req = ctx.request
      const requestBody = { body: req.body, query: ctx.query }
      const operator = ctx.state.user || ''
      const responseBody = ctx.body
      const data = {
        operator,
        path: req.url,
        method: req.method,
        ip: req.ip,
        request_header: req.headers,
        request_body: requestBody,
        response_header: ctx.response.headers,
        response_body: responseBody,
        duration: time,
      }
      // 处理gql错误
      if (req.url.indexOf('/graphql') > -1 && ctx.response.status !== 200) {
        // const GraphqlServer = Symbol.for('Egg#graphqlServer');
        // log(Object.keys(ctx.app[GraphqlServer]));
        // log(ctx.app[GraphqlServer].context.toString());
        // log(await ctx.service.graphql.query(requestBody.body, 'query'));
        let data
        try {
          const errorsObj = JSON.parse(responseBody)
          const { errors } = errorsObj
          if (errors[0].extensions && errors[0].extensions.code) {
            code = errors[0].extensions.code
            message = errors[0].message
          }
          ctx.set({
            'Content-Type': 'application/json',
          })
          ctx.status = 200
          data = ctx.helper.getInfo({ code: STATUS_CODE.ERROR.GRAPHQL[code].code, msg: message })
        } catch (error) {
          ctx.status = 200
          data = ctx.helper.getInfo({ msg: '请求出错' })
        } finally {
          ctx.body = data
        }
      }

      if (responseBody && typeof responseBody === 'string' && responseBody.includes('__schema')) {
        // 如果是获取graghql文档则不写日志
        // ctx.logger.info(JSON.stringify(data));
      } else {
        ctx.logger.info(JSON.stringify(data))
      }
    } catch (err) {
      console.error(err)
      // ctx.logger.error(err);
      // 非断言异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      if (err.code === 'ERR_ASSERTION') {
        err.status = 200
      } else {
        if (Array.isArray(err) && err.length > 0) {
          if (err[0].extensions && err[0].extensions.code) {
            code = err[0].extensions.code
            message = err[0].message
          }
          ctx.status = 200
          const data = ctx.helper.getInfo({ code: STATUS_CODE.ERROR.GRAPHQL[code].code, msg: message })
          ctx.body = data
          return
        }
        ctx.app.emit('error', err, ctx)
      }
      const status = err.status || 500
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      err.msg = status === 500 && ctx.app.config.env === 'prod'
        ? 'Internal Server Error'
        : err.message || err.msg
      ctx.body = ctx.helper.getInfo(err)
      // if (status === 422) {
      //   ctx.body.detail = err.errors;
      // }
      ctx.status = status
    }
  }
}
module.exports = errorHandler
