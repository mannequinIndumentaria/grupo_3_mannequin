function mostrar(idElementoInput, idElementoImg, idFileName){
    console.log('asdasd')
    var archivo = document.getElementById(idElementoInput).files[0];
    var filename = document.getElementById(idFileName);
    console.log('archivo')
    var reader = new FileReader();
    console.log(archivo)
    if (archivo) {
      reader.readAsDataURL(archivo );
      reader.onloadend = function () {
        filename.innerHTML = archivo.name;
        document.getElementById(idElementoImg).src = reader.result;
      }
    }
  }

function sendEmail(subject, body){
  window.open(`mailto:mannequin@gmail.com?subject=${subject}&body=${body}`);
}

function sendPedido(iduser){
  console.log("dentro de send pedido")
  var username = "";
  // var usuario = `Pedido del usuario N° ${iduser} - ${username}`;
  var usuario =  "eppe"
  fetch(`http://localhost:3000/api/products/usercart/${iduser}`)
  .then(function(respuesta){
    return respuesta.json()
  })
  .then(function(informacion){
    var cuerpoEmail = "DATOS DE CONTACTO%0D";
    cuerpoEmail += `Usuario N°(${informacion.idusers})%0D`;
    cuerpoEmail += `${informacion.name} ${informacion.lastname}%0D`;
    cuerpoEmail += `Email: ${informacion.email} %0D`;
    cuerpoEmail += `Telefono: ${informacion.telephone}%0D`;
    cuerpoEmail += "Domicilio: "
    cuerpoEmail += `${informacion.address_street} ${informacion.address_number} piso: ${informacion.address_floor} ${informacion.address_dept} (C.P.${informacion.address_post_code})  ${informacion.city}%0D`;
    cuerpoEmail += "%0D%0D### PEDIDO ###%0D%0D";
    console.log(informacion.product_carrito.length)
    cuerpoEmail += "Codigo%09Talle%09P.Unitario%09Descuento%09Importe%09Producto%0D"
    var total = 0;
    var subtotal = 0;
    var descuentos = 0;
    for(item of informacion.product_carrito){
      descuentos += Number(item.discount);
      subtotal += Number(item.price);
      total += item.price - item.discount;
      console.log("estoy en el for");
      cuerpoEmail += item.idproducts + "%09";
      cuerpoEmail += 'S' + "%09";
      cuerpoEmail += "$"+item.price + "%09";
      cuerpoEmail += "$"+item.discount + "%09%09";
      cuerpoEmail += "$"+(item.price - item.discount) + "%09%09";
      cuerpoEmail += item.name + "%0D";
    }
    cuerpoEmail += "%0D%09%09%09Subtotal: %09 $"+subtotal;
    cuerpoEmail += "%0D%09%09%09Descuentos: %09 $"+descuentos;
    cuerpoEmail += "%0D%09%09%09TOTAL: %09%09 $"+total+"%0D%0D";
    console.log(cuerpoEmail)
    this.sendEmail(usuario,cuerpoEmail);
  })
  .catch(function(error){
    console.log(error);
  })
  console.log(cuerpoEmail);
}