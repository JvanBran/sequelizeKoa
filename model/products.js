const {Model} = require('sequelize');
module.exports =  class StudentModel extends Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                prdId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                prdName: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                price: {
                    type: DataTypes.DECIMAL(5, 4),
                    allowNull: false
                }
            },{
                sequelize,
                freezeTableName: true,
                timestamps: true,
                paranoid: true,
                modelName: 'products',
                comment: "products表",
            }
        )
    }
    static associate(models) {
        models.StudentModel.belongsTo(models.ClassModel,{
            foreignKey: 'userId', 
            targetKey: 'userId', 
            as: 'user'
        })
    }
}