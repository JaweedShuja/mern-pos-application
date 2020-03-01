const router = require('express').Router();
let Product = require('../models/product.model.js');

router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const productName = req.body.productName;
    const productPrice = req.body.productPrice;
    const productCategory = req.body.productCategory;

    const newProduct = new Product({
        productName,
        productPrice,
        productCategory
    })

    newProduct.save()
        .then(() => res.json('Product added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product Deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.productName = req.body.productName;
            product.productPrice = req.body.productPrice;
            product.productCategory = req.body.productCategory;
            
            product.save()
                .then(() => {
                    res.json('Product updated')
                })
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error ' + err))
})

module.exports = router;