module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: true
        },
        user_email: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
            validate: {
            min: 5
            }
        }
    })

    return User;
}