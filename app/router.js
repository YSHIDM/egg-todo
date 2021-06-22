
/**
 * @param {any} app - egg application
 * @return {void}
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
}
