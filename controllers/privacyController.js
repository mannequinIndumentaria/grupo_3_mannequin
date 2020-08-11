/*Importo modulo menu*/
let menu = require('../services/menu');

const privacyController = {

    /*Carrousel*/

    privacy: (req,res) => {

        res.render('privacy', {
            user: req.session.user,
            menu: menu
            
        })
    }
}
    

module.exports = privacyController;