module.exports = (sequelize, DataTypes) => {
    const Stats = sequelize.define('Stats', {
        weight: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        body_fat_percentage: {
            type: DataTypes.INTEGER,
            allowNull: true,
            isUnique: false,
            validate: {
                isInt: true
            } 
        },
        pounds_muscle: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true
            }
        },
        owner: {
            type: DataTypes.INTEGER,
            
        }
    })

    return Stats;
}