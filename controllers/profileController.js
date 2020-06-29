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
let menu = require('../services/menu');
const db = require('../database/models');

const profileController = {
    index: async (req, res) => {

        /*Editar el perfil*/
        let userID = req.params.userId;
        const paises = await db.Country.findAll();

        const profileToEdit = await db.User.findByPk(userID,
            {
                include: [
                    { association: "genders" }, { association: "countries" }
                ]
            }
        );

        res.render('profile', {
            menu: menu,
            paises: paises,
            // users,
            profileToEdit: profileToEdit,
            thousandGenerator: toThousand,
        });
    },

    /*Actualizar el perfil */
    update:async (req, res) => {
        console.log("ESTO MANDO EL FORMMM",req.body);
        let userID = req.params.userId;

        const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            birth_date: req.body.birth_date,
            document: req.body.document,
            avatar: req.files[0].filename,
            address_street: req.body.address_street,
            address_number: req.body.address_number,
            address_floor: req.body.address_floor,
            address_dept: req.body.address_dept,
            address_post_code: req.body.address_post_code,
            city: req.body.city,
            telephone: req.body.telephone,
            admin: false,
            genders_idgenders: req.body.genders_idgenders,
            countries_idcountries: req.body.countries_idcountries
        }

        await db.User.update({
            where: { idusers: userID }
        });

        // let profileToEdit = users.find(item => item.id == userID)

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
    //    if(profileToEdit){
    //        // Completo el resto de los campos con lo que obtengo en el body.
    //         profileToEdit = {
    //             id: profileToEdit.id,
    //             admin:false,
    //             avatar: req.files[0].filename,
    //             ...req.body,
    //             //image: productToEdit.image,
    //         };

    //         // Actualizo el password encriptado
    //         profileToEdit.password = bcrypt.hashSync(req.body.password, 10);
    //     }

    //     let newProfile = users.map(item => {
    //         if (item.id == profileToEdit.id) {
    //             return item = { ...profileToEdit };
    //         }
    //         return item;
    //     })

    //     fs.writeFileSync(usersFilePath, JSON.stringify(newProfile, null, ' '));
        res.redirect('/');
    }

};

module.exports = profileController;