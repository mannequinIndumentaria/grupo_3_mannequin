const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
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
        console.log("ESTO MANDO EL FORMMM",req.body);
        let userID = req.params.userId;
        let profileToEdit = users.find(item => item.id == userID)

        // profileToEdit.name = req.body.name;
        // profileToEdit.lastname = req.body.lastname;
        // profileToEdit.email = req.body.email;
        // profileToEdit.password = bcrypt.hashSync(req.body.password, 10);
        // profileToEdit.date = req.body.date;
        // profileToEdit.gender = req.body.gender;
        // profileToEdit.street = req.body.street;
        // profileToEdit.streetNumber = req.body.streetNumber;
        // profileToEdit.floor = req.body.floor;
        // profileToEdit.apartment = req.body.apartment;
        // profileToEdit.postalCode = req.body.postalCode;
        // profileToEdit.city = req.body.city;
        // profileToEdit.country = req.body.country;
       if(profileToEdit){
           // Completo el resto de los campos con lo que obtengo en el body.
            profileToEdit = {
                id: profileToEdit.id,
                admin:false,
                avatar: req.files[0].filename,
                ...req.body,
                //image: productToEdit.image,
            };

            // Actualizo el password encriptado
            profileToEdit.password = bcrypt.hashSync(req.body.password, 10);
        }

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