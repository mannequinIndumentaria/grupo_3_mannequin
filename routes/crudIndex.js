var express = require('express');
var router = express.Router();
const path = require('path');
const crudIndexController = require('../controllers/crudIndexController')
const crudProductController = require('../controllers/crudProductController')
const crudUserController = require('../controllers/crudUserController')
const multer = require('multer');
const auth = require('../middlewares/adminLogueado');

const storageProduct = multer.diskStorage({
    destination: function(req,file,cb){
cb(null,'public/images/articulos')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+'-'+ Date.now() + path.extname(file.originalname))
    },
});


const storageUser = multer.diskStorage({
    destination: function(req,file,cb){
cb(null,'public/images/users')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+'-'+ Date.now() + path.extname(file.originalname))
    },
});

const uploadProduct = multer({storage: storageProduct});
const uploadUser = multer({storage: storageUser});

/* GET home page. */
router.get('/', auth,crudIndexController.index);
router.get('/product', auth,crudProductController.index);
router.delete('/product/delete/:idArticulo', auth,crudProductController.delete);
router.get('/product/edit/:idArticulo', auth,crudProductController.edit);
router.put('/product/edit/:idArticulo/', auth,uploadProduct.any(), crudProductController.update);
router.get('/product/new:category?', auth,crudProductController.new);
router.post('/product/new', auth,crudProductController.create);
router.get('/product/search', auth,crudProductController.search);

router.get('/users', auth,crudUserController.userIndex);
router.get('/users/edit/:userId', auth,crudUserController.userEdit);
router.put('/users/edit/:userId', auth,uploadUser.any(),crudUserController.userUpdate);
router.delete('/users/delete/:userId', auth,crudUserController.userDelete);
router.get('/users/new', auth,crudUserController.userNew);
router.post('/users/new', auth,uploadUser.any(),crudUserController.userCreate);
router.get('/users/search', auth,crudUserController.search);

module.exports = router;
