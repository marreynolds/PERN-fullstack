const router = require('express').Router();
const sequelize = require('../db')
const Gym = sequelize.import('../models/gyms');
// Gym.sync({force: true})


router.get('/', (req, res) => {
    Gym.findAll()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err.errors[0].message }))
})

router.post('/', (req, res) => {
    // console.log(req.body)
    Gym.create({

        name_of_gym: req.body.Gym.nameOfGym,
        gym_monthly_price: req.body.Gym.gymMonthlyPrice,
        gym_location: req.body.Gym.gymLocation,
        gym_address: req.body.Gym.gymAddress,
        gym_phone_number: req.body.Gym.gymPhoneNumber
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err.errors[0].message }))
})

router.get('/:name', (req, res) => {
    Gym.findOne({ where: { name_of_gym: req.params.name } })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err.errors[0].message }))
})



module.exports = router;