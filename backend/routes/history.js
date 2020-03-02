const router = require('express').Router();
let History = require('../models/history.model.js');


router.route('/').get((req, res) => {
    History.find()
        .then(history => res.json(history))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const customerName = req.body.customerName;
    const totalAmount = req.body.totalAmount;
    const productHistory = req.body.productHistory;

    const newHistory = new History({
        customerName,
        totalAmount,
        productHistory
    })

    newHistory.save()
        .then(() => res.json('History Added'))
        .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router;