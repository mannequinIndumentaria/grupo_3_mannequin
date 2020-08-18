let menu = require('../../services/menu');
const db = require('../../database/models');

const productController = {
    getAllProducts: async (req, res) => {
        const respuesta = await db.Product.findAndCountAll({
            include: [
                {
                    association: "sizes"
                }
            ],
            distinct: true
        })
        if (respuesta) {
            res.json(respuesta);
        } else {
            res.json("");
        }
    },
    addToFavorites: async (req, res) => {
        const usuario = Number(req.body.userId)
        const producto = Number(req.body.artId)
        const action = req.body.action
        if(action == "add"){
            // En la vista no se puede seleccionar talle por el momento
            db.Favorite.create(
                {
                    products_idproducts: producto,
                    users_idusers: usuario
                }
            )
        }else{
            db.Favorite.destroy(
                {
                    where: {
                        products_idproducts: producto,
                        users_idusers: usuario
                    }
                }
            )
        }
        res.json("ok")
    },
    itsFavorite: async (req, res) => {
        const usuario = Number(req.params.userId)
        const producto = Number(req.params.artId)
        const respuesta = await db.Favorite.findOne({
            where:
            {
                products_idproducts: producto,
                    users_idusers: usuario
            }
        })
        if(respuesta){
            res.json(1)
        }else{
            res.json(0)
        }
    },
    addToCart: async (req, res) => {
        const usuario = Number(req.body.userId)
        const producto = Number(req.body.artId)
        const talle = Number(req.body.sizeId)
        // En la vista no se puede seleccionar talle por el momento
        db.Cart.create(
            {
                products_idproducts: producto,
                users_idusers: usuario,
                sizes_idsizes: talle,
                cantidad: 1
            }
        )
        res.json("ok")
    },
    removeFromCart: async (req, res) => {
        const usuario = Number(req.body.iduser)
        const producto = Number(req.body.idproduct)
        const talle = Number(req.body.idsize)
        // En la vista no se puede seleccionar talle por el momento
        db.Cart.destroy(
            {
                where: {
                    products_idproducts: producto,
                    users_idusers: usuario,
                    sizes_idsizes: talle,
                }
            }
        )
        res.json("Borrado");
    },
    getStockProduct: async (req,res) => {
        const productId = req.params.productId;
        const sizeId = req.params.sizeId;
        const respuesta = await db.Product_has_size.findAll({
            where:{
                products_idproducts: productId,
                sizes_idsizes: sizeId
            }
        })
        console.log("respuesta stock",respuesta[0].stock)
        if (respuesta) {
            res.json(respuesta[0].stock);
        } else {
            res.json("");
        }
    },
    setCantidad: async (req,res) => {
        const productId = req.body.idproduct;
        const sizeId = req.body.idsize;
        const cantidad = req.body.cantidad;
        const userId = req.body.iduser;
        const dato = {
            cantidad: cantidad
        }

        const respuest = await db.Cart.update(dato,{
            where: {
                users_idusers: userId,
                products_idproducts:productId,
                sizes_idsizes:sizeId
            }
        })
        res.json("respondido")
    },
    getUserCart: async (req, res) => {
        const usuario = Number(req.params.userId)
        // En la vista no se puede seleccionar talle por el momento
        const respuesta = await db.User.findAll({
            where: { idusers: usuario },
            include: [
                {
                    association: "sizes_carrito"
                }, {
                    association: "product_carrito",
                    include: {
                        association: "images"
                    }
                },
            ]
        })
        const nuevo = respuesta[0].product_carrito.map((item) => {
            idproduct: item.idproduct
            name: item.name
            price: item.price
        })

        console.log(nuevo);

        if (respuesta) {
            console.log("TE RESPONDO ESTO", respuesta[0]);
            res.send(respuesta[0]);
        } else {
            res.json("");
        }
    },
    getSizesByProductId: async (req, res) => {
        const producto = req.params.idproduct
        // En la vista no se puede seleccionar talle por el momento
        const talles = await db.Product.findAll(
            {
                where: {
                    idproducts: producto
                },
                include: [
                    { association: "sizes" }
                ]
            })

        res.json(talles);
    },
    getAllProductsPrices: async (req, res) => {
        const respuesta = await db.Product.findAndCountAll()
        if (respuesta) {
            res.json(respuesta);
        } else {
            res.json("");
        }
    },
    getLastProduct: async (req, res) => {
        const lastProd = await db.Product.max('idproducts')

        const respuesta = await db.Product.findAll({
            where: { idproducts: lastProd },
            include: [
                {
                    association: "sizes"
                },
                {
                    association: "images"
                }
            ]
        })

        if (respuesta) {
            res.json(respuesta);
        } else {
            res.json("");
        }
    },

}

module.exports = productController;