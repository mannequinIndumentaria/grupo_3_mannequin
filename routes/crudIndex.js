var express = require('express');
var router = express.Router();
const crudIndexController = require('../controllers/crudIndexController')

/* GET home page. */
router.get('/', crudIndexController.index);
router.delete('/delete/:idArticulo', crudIndexController.borrar);

router.get('/edit/:idArticulo', crudIndexController.editar);
router.put('/edit/:idArticulo/', crudIndexController.store);

module.exports = router;
