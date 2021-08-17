const {Model} = require('sequelize');
module.exports =  class ClassModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                userId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                userName: {
                    type: DataTypes.STRING,
                    allowNull: true
                },
                birthDay: {
                    type: 'TIMESTAMP',
                    allowNull: false
                },
                gender: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: 0
                },
                ctime: {
                    type: 'TIMESTAMP',
                    allowNull: false,
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
                },
                updatedAt: {
                    type: 'TIMESTAMP',
                    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
                    field: 'ctime'
                }
            },{
                sequelize,
                freezeTableName: true,
                timestamps: true,
                paranoid: true,
                modelName: 'user',
                comment: "user表",
            }
        )
    }
}