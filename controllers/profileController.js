const fs = require('fs');
const path = require('path');
const session = require('express-session');

/*Importo json categories*/
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

/*Importo conversor*/
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

/*Importo paises*/
const paisesFilePath = path.join(__dirname, '../data/paises.json');
const paises = JSON.parse(fs.readFileSync(paisesFilePath, 'utf-8'));

/*Importo users*/
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const profileController = {
    index: (req, res) => {

        /*Editar el perfil*/
        let userID = req.params.userId;
        let profileToEdit = users.find(item => item.id == userID)

        res.render('profile', {
            categoriesJSON,
            paises,
            users,
            user: profileToEdit,
            thousandGenerator: toThousand,
            profileToEdit
        });
    },

    /*Actualizar el perfil */
    update: (req, res) => {
        
        let userID = req.params.userId;
        let profileToEdit = users.find(item => item.id == userID)

        req.body.name = req.body.name;
        req.body.lastname = req.body.lastname;
        req.body.email = req.body.email;
        req.body.password = req.body.password;
        req.body.date = req.body.date;
        req.body.gender = req.body.gender;
        req.body.street = req.body.street;
        req.body.streetNumber = req.body.streetNumber;
        req.body.floor = req.body.floor;
        req.body.apartment = req.body.apartment;
        req.body.postalCode = req.body.postalCode;
        req.body.city = req.body.city;
        req.body.country = req.body.country;
       
        profileToEdit = {
            id: profileToEdit.id,
            ...req.body,
            //image: productToEdit.image,
        };

        let newProfile = users.map(item => {
            if (item.id == profileToEdit.id) {
                return item = { ...profileToEdit };
            }
            return item;
        })

        fs.writeFileSync(usersFilePath, JSON.stringify(newProfile, null, ' '));
        res.redirect('/');
    }

};

module.exports = profileController;