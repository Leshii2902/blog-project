const express = require('express');
const router = express.Router();

const Subscriptons = require('../models/subscriptions');

router.get('/sample/', (req, res, next) => {
    Subscriptons.findSampleSubs(10, +req.query.offset, +req.query.user_id, (result) => {
        res.json(result);
    })
});

router.post('/add/', (req, res, next) => {
    Subscriptons.addSub(req.body.user_id, req.body.sub_user_id, (result) => {
        res.json(result);
    })
});

router.post('/delete/', (req, res, next) => {
   Subscriptons.deleteSub(req.body.user_id, req.body.sub_user_id, (result) => {
       res.json(result);
   })
});
module.exports = router;