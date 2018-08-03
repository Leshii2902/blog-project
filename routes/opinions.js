const express = require('express');

const router = express.Router();

const Opinions = require('../requests/opinionsRequests');
const Users = require('../requests/usersRequests');


// выборка постов для автоподгрузки
router.get('/sample/', (req, res, next) => {
    Opinions.findSample(10, +req.query.offset, (result_opinions) => {
        res.json(result_opinions);
    })
});

// добавить отзыв
router.post('/add/', (req, res, next) => {
    console.log(req.body);
    Opinions.add(req.body.name, req.body.user_id, req.body.body, result_opinion => {
        let opinion = result_opinion.dataValues;
        if (req.body.user_id) {
            Users.findUserByIdForLike(req.body.user_id, result_user => {
                opinion.author = result_user.dataValues;
                console.log(opinion);
                res.json(opinion);
            });
        } else {
            console.log(opinion);
            res.json(opinion);
        }
    })
});

module.exports = router;