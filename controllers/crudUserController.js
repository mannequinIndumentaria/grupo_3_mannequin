const path = require('path');
const fs= require('fs');
const pathProducts = path.join("data","products.json");
const fileProducts = fs.readFileSync(pathProducts,null,'');
const products = JSON.parse(fileProducts);
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categoriesJSON = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));
const pathProductsInfo = path.join("data","products-info.json");
const fileProductsInfo = fs.readFileSync(pathProductsInfo,null,'');
const productsInfo = JSON.parse(fileProductsInfo);
const pathSizes = path.join("data","sizes.json");
const fileSizes = fs.readFileSync(pathSizes,null,'');
const sizes = JSON.parse(fileSizes);
const pathColors = path.join("data","colors.json");
const fileColors = fs.readFileSync(pathColors,null,'');
const colors = JSON.parse(fileColors);
const db = require('../database/models');
const { Console } = require('console');

const crudUserController = {
    userIndex: async (req,res) =>{
        const usuario = await db.User.findAll({
            include: [
                { association: "genders" }
            ],
            where: {
                discontinued: 0
            }
        });
        res.render('crudUsers',
        {
            usuarios: usuario
        });
    },
    userEdit: async (req,res) => {
        const usuario = await db.User.findByPk(req.params.userId,{
            include: [
                { association: "genders" }, { association: "countries" }
            ],
        });

        const paises = await db.Country.findAll();

        res.render('editarUsuario',
        {
            usuario: usuario,
            paises: paises
        });
    },
    userUpdate:async (req,res) => {
        let userID = req.params.userId;
        console.log("BODY",req.body);
        console.log("ID",req.params.userId);
        const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            birth_date: req.body.birth_date,
            // avatar: req.files[0].filename,
            address_street: req.body.address_street,
            address_number: req.body.address_number,
            address_floor: req.body.address_floor,
            address_dept: req.body.address_dept,
            address_post_code: req.body.address_post_code,
            city: req.body.city,
            genders_idgenders: req.body.genders_idgenders,
            countries_idcountries: req.body.countries_idcountries,
        }
        console.log("USUARIO",user);
        
        await db.User.update(user,{
            where: { idusers: userID}
        });
        res.redirect('/crudIndex/users');
    },
    userDelete:async (req,res)=>{
        const userId = req.params.userId;

        // const articulos = products.filter(element => element.id != idArticulo);
        // fs.writeFileSync(pathProducts,JSON.stringify(articulos,null, ''));

        // const articulosInfo =  productsInfo.filter(element => element.product_id != idArticulo);
        // fs.writeFileSync(pathProductsInfo,JSON.stringify(articulosInfo,null,' '));

        await db.User.update(
            {discontinued: 1},
            {where: {
                idusers: userId
            }
        });

        res.redirect('/crudIndex/users');

    },
    userNew:async (req,res) =>{
        const paises = await db.Country.findAll();
        res.render('cargaUsuario',{
            paises: paises
        });
    },
    userCreate: async (req,res) => {
        let userID = req.params.userId;

        const user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            birth_date: req.body.birth_date,
            password: '',
            // avatar: req.files[0].filename,
            address_street: req.body.address_street,
            address_number: req.body.address_number,
            address_floor: req.body.address_floor,
            address_dept: req.body.address_dept,
            address_post_code: req.body.address_post_code,
            city: req.body.city,
            genders_idgenders: req.body.genders_idgenders,
            countries_idcountries: req.body.countries_idcountries,
        }

        
        await db.User.create(user);
        res.redirect('/crudIndex/users');
    },
    search: async (req, res) => {


        const finalSearch = await db.User.findAll({
            where: {
                discontinued: 0,
                [db.Sequelize.Op.or]: [
                    {
                        name: {
                        [db.Sequelize.Op.like]: '%' + req.query.keywords + '%'
                        }
                    },{
                        lastname: {
                            [db.Sequelize.Op.like]: '%' + req.query.keywords + '%'
                        }
                    },{
                        email: {
                            [db.Sequelize.Op.like]: '%' + req.query.keywords + '%'
                        }
                    }
                ]
            },
            include: [
                { association: "genders" }
            ],
        });

        res.render('crudUsers', {
            usuarios: finalSearch
        });

    }

};

module.exports = crudUserController;