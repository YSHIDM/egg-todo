const { app, assert } = require('egg-mock/bootstrap')


describe('get()', () => {

  it('should get null when user not exists', async () => {
    const ctx = app.mockContext()
    const user = await ctx.service.scheduleRecordSvc.byPk('')
    assert(!user)
  })
})
