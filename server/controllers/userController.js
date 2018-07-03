const router = require('express').Router();
const sequelize = require('../db')
const User = sequelize.import('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
    User.findAll()
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err.errors[0].message }))
})

router.post('/', (req, res) => {
    console.log(req.body)
    User.create({

        first_name: req.body.User.firstName,
        last_name: req.body.User.lastName,
        password: bcrypt.hashSync(req.body.User.password, 10),
        user_email: req.body.User.email,
        user_name: req.body.User.username
    })
        .then(
            function createSuccess(user) {
                var token = jwt.sign({ id: user.id }, process.env.JWTtoken, { expiresIn: 60 * 60 * 24 });
                res.json({
                    user: user,
                    message: 'created',
                    sessionToken: token
                });
            },
    )
        .catch(err => res.status(500).json({ error: err.errors[0].message }))
})

router.get('/:name', (req, res) => {
    User.findOne({ where: { first_name: req.params.name } })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err.errors[0].message }))
})

router.post('/signin', function (req, res) {
    User.findOne({ where: { user_name: req.body.User.username } }).then(
        function (user) {
            if (user) {
                bcrypt.compare(req.body.User.password, bcrypt.hashSync(req.body.User.password, 10), function (err, matches) {
                    if (matches) {
                        var token = jwt.sign({ id: user.id },process.env.JWTtoken, { expiresIn: 60 * 60 * 24 });
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "wrong password" });
                    }
                });
            } else {
                res.status(500).send({ error: "wrong password" });
            }
        },
        function (err) {
            res.status(501).send({ error: "could not find user" });
        }
    );
});

module.exports = router;