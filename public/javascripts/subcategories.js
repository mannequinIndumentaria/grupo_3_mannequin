window.addEventListener("load",function(){
    var cat = document.querySelector("#categories")
    cat.addEventListener("change",function(){
      getSubcategories(cat)
    })
})

function getSubcategories(cat,subcategoria){
  fetch(`/crudIndex/product/new?category=${cat.value}`)
      .then(function(response){
        return response.json();
      })
      .then(function(informacion){
        var subcat = document.querySelector("#subcategories")
        subcat.innerHTML= ""
        var optionDefault = document.createElement('option');
        optionDefault.selected = "selected";
        subcat.disabled = "disabled";
        if(informacion.length > 0){
            subcat.disabled = "";
            optionDefault.innerHTML = "Seleccione una categoria...";
            subcat.appendChild(optionDefault);
            for(var i = 0; i < informacion.length; i++){
              var option = document.createElement('option');
              option.value = informacion[i].idproduct_categories;
              console.log("subcategoria1",subcategoria)
              if(subcategoria != null){
                console.log("subcategoria2",subcategoria)
                
                if(subcategoria == informacion[i].idproduct_categories ){
                  console.log("subcategoria3",subcategoria)
                  option.selected = "selected";
                }
              }
              option.innerHTML = informacion[i].name;
              subcat.appendChild(option);
            }
        }else{
            optionDefault.innerHTML = "-Sin subcategorias-";
            subcat.appendChild(optionDefault);
        }
      })
      .catch(function(error){
        console.log(error);
      })
}