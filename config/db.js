const { Sequelize } = require('sequelize');
const fs = require('fs')
const path = require('path')
const sequelize = new Sequelize('sequelize','root','123456',{
    host: '192.168.1.13',
    port: '19306',
    dialect:'mysql',
    logging: log,
    dialectOptions: {
        charset: "utf8",
        bigNumberStrings: true
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});
// sequelize.sync({force: true})
function log(sql,detail){
    // console.log(sql,detail);
}
const db = {
    sequelize
};
fs.readdirSync('./model').filter((file) => {
    return (file.indexOf('.') !== 0) && (!['index.js'].includes(file))
}).forEach((file) => {
    const model = require('../model/'+file);
    db[model.name] = model.init(sequelize, Sequelize)
})
Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db)
    }
})
module.exports = db