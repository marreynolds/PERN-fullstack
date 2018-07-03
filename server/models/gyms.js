module.exports = (sequelize, DataTypes) => {
    const Gym = sequelize.define('Gym', {
        name_of_gym: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gym_monthly_price : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gym_location: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gym_address: {
            type: DataTypes.STRING,
            allowNull: false,
            isUnique: true,
        },
        gym_phone_number: {
            type: DataTypes.STRING,
            allowNull:false,
            isUnique: true,
        }
    })

    return Gym;
}