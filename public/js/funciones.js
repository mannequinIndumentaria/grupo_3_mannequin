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

  fetch(`https://mannequin-indumentaria.herokuapp.com/api/products/usercart/${iduser}`)
  .then(function(respuesta){
    return respuesta.json()
  })
  .then(function(informacion){
    var cuerpoEmail = "DATOS DE CONTACTO%0D";
    fetch(`https://mannequin-indumentaria.herokuapp.com/api/users/${iduser}`)
    .then(function(respuesta){
      return respuesta.json()
    })
    .then(function(usuarioinfo){
      console.log("USUARIO", usuarioinfo)
      cuerpoEmail += `Usuario N°(${usuarioinfo.idusers})%0D`;
      cuerpoEmail += `${usuarioinfo.name} ${usuarioinfo.lastname}%0D`;
      cuerpoEmail += `Email: ${usuarioinfo.email} %0D`;
      cuerpoEmail += `Telefono: ${usuarioinfo.telephone}%0D`;
      cuerpoEmail += "Domicilio: "
      cuerpoEmail += `${usuarioinfo.address_street} ${usuarioinfo.address_number} piso: ${usuarioinfo.address_floor} ${usuarioinfo.address_dept} (C.P.${usuarioinfo.address_post_code})  ${usuarioinfo.city}%0D`;
      // PEDIDO
      cuerpoEmail += "%0D%0D### PEDIDO ###%0D%0D";
      cuerpoEmail += "Codigo%09Cantidad%09Talle%09P.Unitario%09Descuento%09Subtotal%09Total%09%09Producto%0D"
      var total = 0;
      var subtotal = 0;
      var descuentos = 0;
      for(item of informacion){
        descuentos += Number(item.descuento);
        subtotal += Number(item.subtotal);
        total += Number(item.total);

        console.log("estoy en el for");
        cuerpoEmail += item.idproducts + "%09";
        cuerpoEmail += item.cantidad + "%09%09";
        cuerpoEmail += item.talle + "%09";
        cuerpoEmail += "$"+item.unitario + "%09";
        cuerpoEmail += "$"+item.descuento + "%09%09";
        cuerpoEmail += "$"+item.subtotal + "%09";
        cuerpoEmail += "$"+item.total + "%09";
        cuerpoEmail += item.name + "%0D";
      }
      var cupon = document.getElementById('mensajecupon').innerHTML;
      if(cupon != ""){
        cuerpoEmail += "%0D%09%09%09Subtotal: %09 "+document.getElementById('subtotal').innerHTML;
        cuerpoEmail += "%0D%09%09%09Descuentos: %09 "+document.getElementById('descuento').innerHTML;
        cuerpoEmail += "%0D%09%09%09TOTAL: %09%09 "+document.getElementById('total').innerHTML+"%0D%0D";
      }else{
        cuerpoEmail += "%0D%09%09%09Subtotal: %09 $"+subtotal;
        cuerpoEmail += "%0D%09%09%09Descuentos: %09 $"+descuentos;
        cuerpoEmail += "%0D%09%09%09TOTAL: %09%09 $"+total+"%0D%0D";
      }
      this.username = informacion.name;
      console.log(cuerpoEmail)
      this.sendEmail(this.username,cuerpoEmail);
    })
  })
  .catch(function(error){
    console.log(error);
  })
}