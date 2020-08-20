window.addEventListener("load", function () {
    
    var formulario = document.getElementById("formRegistro")
    formulario.addEventListener("submit",function(e){
        // Si las validaciones estan OK, no hay ningun span
        var hayErrores = document.getElementsByTagName("span").length;
        if( 
            !hayErrores &
            (document.getElementById("name").value.length > 0) &
            (document.getElementById("lastname").value.length > 0) &
            (document.getElementById("email").value.length > 0) &
            (document.getElementById("repeatEmail").value.length > 0) &
            (document.getElementById("repeatPassword").value.length > 0) &
            (document.getElementById("password").value.length > 0)
        ){
            
            // hace el default
        }
        else{
            console.log("hayErrores",hayErrores)
            console.log("name", document.getElementById("name").value.length);
            console.log("lastname",document.getElementById("lastname").value.length > 0) &
            console.log("email",document.getElementById("email").value.length > 0) &
            console.log("repeatEmail",document.getElementById("repeatEmail").value.length > 0) &
            console.log("repeatPassword",document.getElementById("repeatPassword").value.length > 0) &
            console.log("password",document.getElementById("password").value.length > 0)
            e.preventDefault();
        }
    })


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
            return "La contraseña debe contener un minimo de 8 caracteres con al menos 1 Mayuscula, 1 Minuscula, 1 Numero, y 1 Simbolo"
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
  
    ///////////// PRINCIPAL ///////////

    function mostrarError(idInput, mensajeErrorCallback) {

        var elemento = document.getElementById(idInput);
        elemento.style.border = "none"
        var validar = mensajeErrorCallback(elemento);

        if (validar.length > 0) {
            var OldError = document.getElementById(elemento.name + "Error") // passwordError
            if (OldError !== null) {
                OldError.remove()
            }
            var error = document.createElement('span');
            error.style.color = "red";
            error.id = elemento.name + "Error";
            error.innerHTML = validar;
            elemento.style.border = "1px solid red"
            elemento.parentElement.appendChild(error)
        } else {
            var OldError = document.getElementById(elemento.name + "Error")
            if (OldError !== null) {
                OldError.remove()
            }
        }
    }

    // NOMBRE
    var campoNombre = document.querySelector("#name");
    campoNombre.addEventListener("blur", function () {
        mostrarError(this.id, validarString)
    })
    campoNombre.addEventListener("keyup", function () {
        mostrarError(this.id, validarString)
    })
    // APELLIDO
    var campoApellido = document.querySelector("#lastname");
    campoApellido.addEventListener("blur", function () {
        mostrarError(this.id, validarString)
    })
    campoApellido.addEventListener("keyup", function () {
        mostrarError(this.id, validarString)
    })
    // EMAIL
    var campoEmail = document.querySelector("#email");
    campoEmail.addEventListener("blur", function () {
        mostrarError(this.id, validarString)
        mostrarError(this.id, validateEmail)   

        fetch(`/api/users/email/${campoEmail.value}`)
        .then(function(response){
            return response.json();
        })
        .then(function(informacion){
            if(informacion.length > 0){
                mostrarError(campoEmail.id, function(elemento){ 
                    elemento.length;
                    return "Email existente"
                })
            }
        })

    })

    campoEmail.addEventListener("keyup", function () {
        mostrarError(this.id, validarString)
        mostrarError(this.id, validateEmail)
    })
    // RE EMAIL
    var campoReEmail = document.querySelector("#repeatEmail");
    campoReEmail.addEventListener("blur", function () {
        mostrarError(this.id, validateReEmail)
    })
    campoReEmail.addEventListener("keyup", function () {
        mostrarError(this.id, validateReEmail)
    })

    // PASSWORD
    var campoPassword = document.querySelector("#password");
    campoPassword.addEventListener("blur", function () {
        mostrarError(this.id, validatePassword)
    })
    campoPassword.addEventListener("keyup", function () {
        mostrarError(this.id, validatePassword)
    })
    // RE PASSWORD
    var campoRePassword = document.querySelector("#repeatPassword");
    campoRePassword.addEventListener("blur", function () {
        mostrarError(this.id, validateRePassword)
    })
    campoRePassword.addEventListener("keyup", function () {
        mostrarError(this.id, validateRePassword)
    })
});


