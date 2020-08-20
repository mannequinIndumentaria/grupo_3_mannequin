const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const { check, validationResult, body } = require('express-validator');

const usersFilePath = path.join(__dirname, '../../data/users.json');

let menu = require('../../services/menu');
const db = require('../../database/models');

const usersController = {
    getUserByEmail: async (req,res) =>{
        const respuesta = await db.User.findAll(
            {
                where: {
                    email: req.params.email
                }
            }
        )
        if(respuesta){
            res.json(respuesta);
        }else{
            res.json("");
        }
    },
    getUserByID: async (req,res) =>{
        const respuesta = await db.User.findAll(
            {
                where: {
                    idusers: req.params.id
                }
            }
        )
        if(respuesta){
            res.json(respuesta[0]);
        }else{
            res.json("");
        }
    },
    getAllUsers: async (req,res) =>{
        const respuesta = await db.User.findAndCountAll()
        if(respuesta){
            res.json(respuesta);
        }else{
            res.json("");
        }
    }
}


module.exports = usersController;