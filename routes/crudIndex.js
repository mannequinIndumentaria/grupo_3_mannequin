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
router.delete('/delete/:idArticulo', crudIndexController.borrar);

router.get('/edit/:idArticulo', crudIndexController.editar);
router.put('/edit/:idArticulo/', upload.any(), crudIndexController.store);

router.get('/new', crudIndexController.nuevo);
router.post('/new', crudIndexController.nuevoStore);

module.exports = router;
