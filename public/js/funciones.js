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