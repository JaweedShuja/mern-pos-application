const router = require('express').Router();
let ProductCategory = require('../models/productCategory.model.js');

router.route('/').get((req, res) => {
    ProductCategory.find()
        .then(productCategories => res.json(productCategories))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const productCategoryName = req.body.productCategoryName;

    const newProductCategory = new ProductCategory({
        productCategoryName,
    })

    newProductCategory.save()
        .then(() => res.json('Product Category added'))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    ProductCategory.findById(req.params.id)
        .then(productCategory => res.json(productCategory))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product Category Deleted'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    ProductCategory.findById(req.params.id)
        .then(productCategory => {
            productCategory.productCategoryName = req.body.productCategoryName;
            
            productCategory.save()
                .then(() => {
                    res.json('Product updated')
                })
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error ' + err))
})

module.exports = router;