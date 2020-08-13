/*Importo modulo menu*/
let menu = require('../services/menu');

const helpController = {

    /*Carrousel*/

    privacy: (req,res) => {

        res.render('privacy', {
            user: req.session.user,
            menu: menu
            
        })
    },
    shipping: (req,res) => {

        res.render('shipping', {
            user: req.session.user,
            menu: menu
            
        })
    },
    payment: (req,res) => {

        res.render('payment', {
            user: req.session.user,
            menu: menu
            
        })
    },
    contact: (req,res) => {

        res.render('contact', {
            user: req.session.user,
            menu: menu
            
        })
    },
    returns: (req,res) => {

        res.render('returns', {
            user: req.session.user,
            menu: menu
            
        })
    },
    
}
    

module.exports = helpController;