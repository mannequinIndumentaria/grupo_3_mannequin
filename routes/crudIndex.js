var express = require('express');
var router = express.Router();
const path = require('path');
const crudIndexController = require('../controllers/crudIndexController')
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
router.delete('/delete/:idArticulo', crudIndexController.delete);

router.get('/edit/:idArticulo', crudIndexController.edit);
router.put('/edit/:idArticulo/', upload.any(), crudIndexController.update);

router.get('/new', crudIndexController.new);
router.post('/new', crudIndexController.create);

router.get('/users', crudIndexController.userIndex);
router.get('/users/edit/:userId', crudIndexController.userEdit);
router.put('/users/edit/:userId', crudIndexController.userUpdate);
router.delete('/users/delete/:userId', crudIndexController.userDelete);
router.get('/users/new', crudIndexController.userNew);
router.post('/users/new', crudIndexController.userCreate);

module.exports = router;
