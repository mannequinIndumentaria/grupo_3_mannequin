// const arrayProductos = []; //products.json
const carritoController = {
    carrito: (req,res) => {
        res.render('carrito');
    },

    // filter: (req,res) => {
    //     const categoria = req.params.categoria;
    //     const subcategoria = req.params.subcategoria;
    //     const desde = req.params.desde;
    //     const hasta = req.params.hasta;    
    //     const articulosFiltrados = arrayProductos.filter(articulo =>{
    //         return articulo.category == categoria && articulo.subcategory == subcategoria;
    //     });
    //     const productosEnPagina = articulosFiltrados.slice(desde,hasta);
    //     res.render('carrito',{data: productosEnPagina});
    // }

};

module.exports = carritoController;