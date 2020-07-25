window.addEventListener("load", function () {
    //alert('Trial');

    // function mostrarError(idInput, mensajeError) {
    //     var elemento = document.getElementById(idInput);
    //     console.log(idInput);
    //     console.log(elemento.name);
    //     if (elemento.value.length < 1) {
    //         var OldError = document.getElementById(elemento.name + "Error")
    //         if (OldError !== null) {
    //             OldError.remove()
    //         }
    //         var error = document.createElement('span');
    //         error.id = elemento.name + "Error";
    //         error.innerHTML = mensajeError;
    //         elemento.parentElement.appendChild(error)
    //     } else {
    //         var OldError = document.getElementById(elemento.name + "Error")
    //         OldError.remove();
    //     }
    // }

    //Validar que sea mail
    var validateEmail = function (element) {
        var email = element.value
        //console.log(email);
        var mail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(mail.test(email));
        if (mail.test(email)) {
            return ""
        } else {
            return "Ingrese un email valido"
        }
    }

    //Validar que se repitan mails
    var validateReEmail = function (element) {
        //var email = email.value;
        var email = document.getElementById("email").value;
        var reEmail = element.value
        if (reEmail === email) {
            return ""
        } else {
            return "El correo no coincide"
        }
    }

      //Validar que sea password
      var validatePassword = function (element) {
        var password = element.value
        //console.log(email);
        var pass =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
        console.log(pass.test(password));
        if (pass.test(password)) {
            return ""
        } else {
            return "La contraseña debe contener un minimo de 8 caracteres: letras mayusculas y minusculas, numeros y caracteres especiales"
        }
    }

      //Validar que se repita password
      var validateRePassword = function (element) {
        //var email = email.value;
        var password = document.getElementById("password").value;
        var rePassword = element.value
        if (rePassword === password) {
            return ""
        } else {
            return "La contraseña no coincide"
        }
    }

    var validarString = function (elemento) {
        if (elemento.value.length < 1) {
            return "Debe ingresar un " + elemento.name;
        } else {
            return ""
        }
    }
  

    function mostrarError(idInput, mensajeErrorCallback) {

        var elemento = document.getElementById(idInput);

        var validar = mensajeErrorCallback(elemento);

        if (validar.length > 0) {
            var OldError = document.getElementById(elemento.name + "Error")
            if (OldError !== null) {
                OldError.remove()
            }
            var error = document.createElement('span');
            error.id = elemento.name + "Error";
            error.innerHTML = validar;
            elemento.parentElement.appendChild(error)
        } else {
            var OldError = document.getElementById(elemento.name + "Error")
            if (OldError !== null) {
                OldError.remove()
            }
        }
    }

    var campoNombre = document.querySelector("#name");
    campoNombre.addEventListener("blur", function () {
        mostrarError(this.id, validarString)
    })

    var campoApellido = document.querySelector("#lastname");
    campoApellido.addEventListener("blur", function () {
        mostrarError(this.id, validarString)
    })

    var campoEmail = document.querySelector("#email");
    campoEmail.addEventListener("blur", function () {
        mostrarError(this.id, validarString)
        mostrarError(this.id, validateEmail)
    })

    var campoReEmail = document.querySelector("#repeatEmail");
    campoReEmail.addEventListener("blur", function () {
        mostrarError(this.id, validateReEmail)
    })

    var campoPassword = document.querySelector("#password");
    campoPassword.addEventListener("blur", function () {
        mostrarError(this.id, validatePassword)
    })

    var campoRePassword = document.querySelector("#repeatPassword");
    campoRePassword.addEventListener("blur", function () {
        mostrarError(this.id, validateRePassword)
    })

});


