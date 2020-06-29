var express = require('express');
var router = express.Router();
const path = require('path');
const crudIndexController = require('../controllers/crudIndexController')
const crudProductController = require('../controllers/crudProductController')
const crudUserController = require('../controllers/crudUserController')
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
cb(null,'public/images/articulos')
    },
    filename: function(req,file,cb){
        cb(null, file.fieldname+'-'+ Date.now() + path.extname(file.originalname))
    },
});

const upload = multer({storage: storage});


/* GET home page. */
router.get('/', crudIndexController.index);
router.get('/product', crudProductController.index);
router.delete('/product/delete/:idArticulo', crudProductController.delete);
router.get('/product/edit/:idArticulo', crudProductController.edit);
router.put('/product/edit/:idArticulo/', upload.any(), crudProductController.update);
router.get('/product/new', crudProductController.new);
router.post('/product/new', crudProductController.create);
router.get('/product/search', crudProductController.search);

router.get('/users', crudUserController.userIndex);
router.get('/users/edit/:userId', crudUserController.userEdit);
router.put('/users/edit/:userId', crudUserController.userUpdate);
router.delete('/users/delete/:userId', crudUserController.userDelete);
router.get('/users/new', crudUserController.userNew);
router.post('/users/new', crudUserController.userCreate);
router.get('/users/search', crudUserController.search);

module.exports = router;
