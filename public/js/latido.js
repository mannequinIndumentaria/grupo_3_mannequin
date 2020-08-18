function latido(){
    var corazon = document.getElementById("favoritosPrincipal");
    setTimeout(function(){ 
        corazon.style.color = 'red'
    }, 100);
    setTimeout(function(){ 
        corazon.style.color = 'white'
    }, 500);
}

function newitem(){
    var corazon = document.getElementById("carritoPrincipal");
    setTimeout(function(){ 
        corazon.style.color = 'yellow'
    }, 100);
    setTimeout(function(){ 
        corazon.style.color = 'white'
    }, 500);
}