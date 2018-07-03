var router = require('express').Router();
var sequelize = require('../db');
var Stats = sequelize.import('../models/stats');

/*************************************
* GET ALL ITEMS FOR INDIVIDUAL USER
*************************************/
router.get('/', function (req, res) {
    var userid = req.user.id;

    Stats
        .findAll({
            where: { owner: userid }
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

/*************************************
* POST SINGLE ITEM FOR INDIVIDUAL USER
*************************************/
router.post('/', function (req, res) {
    // console.log(req.user)
    Stats
        .create({
            weight: req.body.Stats.weight,
            height: req.body.Stats.height,
            body_fat_percentage: req.body.Stats.bodyFatPercentage,
            pounds_muscle: req.body.Stats.poundsMuscle,
            owner: req.user.id
        })
        .then(
            function createSuccess(Stats) {
                res.json({
                    Stats: Stats
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

/******************
* GET SINGLE ITEM FOR INDIVIDUAL USER
******************/
router.get('/:id', function (req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    Stats
        .findOne({
            where: { id: data, owner: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

/******************
* UPDATE ITEM FOR INDIVIDUAL USER
******************/
router.put('/update/:id', function (req, res) {
    var data = req.params.id; 
    var authtestdata = req.body.Stats.weight; 

    Stats
        .update({ 
            weight: req.body.Stats.weight 
        },
            { where: { id: req.params.id } } 
        ).then(
            function updateSuccess(updatedLog) {
                res.json({
                    weight: req.body.Stats.weight
                });
            },
            function updateError(err) { 
                res.send(500, err.message);
            }
        )
});

/******************
* DELETE ITEM FOR INDIVIDUAL USER
******************/
router.delete('/delete/:id', function (req, res) {

    Stats
        .destroy({
            where: { id: req.params.id, owner: req.user.id } 
        }).then(
            function deleteLogSuccess(data) { 
                res.send("you removed a log");
            },
            function deleteLogError(err) { 
                res.send(500, err.message);
            }
        );
});

module.exports = router;