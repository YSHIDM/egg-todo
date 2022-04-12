// const Sequelize = require('sequelize')

// module.exports = app => {

//   const { DataTypes: { STRING, TEXT } } = app.Sequelize
//   class Test extends Sequelize.Model {
//     // coding...
//     static foo() {
//       console.log('可以调用了')
//     }
//   }
//   Test.init({
//     id: {
//       type: STRING(25),
//       primaryKey: true,
//       unique: true,
//       autoIncrement: true,
//     },
//     title: STRING(64),
//     content: TEXT,
//     articleID: STRING(64),
//   }, { sequelize: app.Sequelize })

//   return Test
// }
