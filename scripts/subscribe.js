window.addEventListener('load', function () {
    var subscribeBtn = document.querySelector(".subscribeBtn")
    var avisoSuscripto = document.querySelector(".aviso-suscrpito")
    var submitSubsc = subscribeBtn.addEventListener("click", function (e) {
        e.preventDefault()
        fetch('https://mannequin-indumentaria.herokuapp.com/api/subscribers', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Contant-Type': 'application/json'
            }
        })
            .then(function (res) {
                if (res.status == 201) {
                    avisoSuscripto.innerHTML = "¡Se ha suscrito a nuestro email!"
                }
            })
            .catch(error => console.error('Error:', error))
            .then(function (res) {
                console.log('Suscrito: ', res)
            })
    })
})