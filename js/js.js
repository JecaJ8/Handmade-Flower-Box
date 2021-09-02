const navigation=document.querySelector('.navigation');

window.onscroll=function() {
    var top=window.scrollY;
    this.console.log(top);
    if (top>=150) {
        navigation.classList.add('active')
    }
    else {
        navigation.classList.remove('active');
    }
}

function openNav() {
    document.getElementById("myNav").style.width = "100%";
  }

  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }

  

$.ajax({//povlacimo proizvode
    url: 'http://localhost:3000/products',
    type: 'GET', //GET -- za povlacenje podataka,PUT -- azuriranje, POST -- dodavanje
    dataType: 'html',
    success: function(data)
    {
        fillProducts(data);
    },
    error: function(xhr, status, error)
    {
       console.log("Error: " + status + " " + error);
    }
});

$.ajax({//povlacimo sve kategorije iz baze
    url: 'http://localhost:3000/categories',
    type: 'GET', //GET -- za povlacenje podataka,PUT -- azuriranje, POST -- dodavanje
    dataType: 'html',
    success: function(data)
    {
        fillCategories(data);//pozivamo funkciju i prosledjujemo joj kategorije
    },
    error: function(xhr, status, error)
    {
       console.log("Error: " + status + " " + error);
    }
});

function fillCategories(data){
    console.log(data);

    let categories = JSON.parse(data); //pretvaramo json podatke u niz objekata tipa Kategorija
    let div = document.getElementById("categories"); //selektujemo div u kome ubacujemo kategorije

    for(let i=0;i<categories.length;i++){
        //console.log("test",categories[i].name);
        div.innerHTML += `<button class="list-group-item" onclick="searchCategory(${categories[i].id})">${categories[i].name}</button>`;
    }
}

function fillProducts(data){
    let products = JSON.parse(data);
    let divProducts = document.getElementById("products");

    for(let i=0;i<products.length;i++){
        console.log("test",products[i].image);
        let card = document.createElement("div");
        card.className = "card";
        let mainDiv = document.createElement("div");
        mainDiv.className = "cardstuff";
        mainDiv.innerHTML = `<img src=${products[i].image} class="card-img-top" />`;

        let cardBody = document.createElement("div");
        cardBody.className = "card-body";

        cardBody.innerHTML = `<h4 class="card-title"><a href="#"> ${products[i].headline} </a> </h4>`;
        cardBody.innerHTML += `<h5>${products[i].price}</h5>`;

        let cardCart=document.createElement("div");
        cardCart.className="card-cart";
        cardCart.innerHTML=`<h5><a href="#">Dodaj u korpu</a></h5><i class="fas fa-shopping-cart"></i>`

        mainDiv.appendChild(cardBody);
        mainDiv.appendChild(cardCart);
        card.appendChild(mainDiv);
        divProducts.appendChild(card);
       
        
    }
}

function searchCategory(categoryId){
    document.getElementById("products").innerHTML = "";
    $.ajax({
        url: `http://localhost:3000/products?categoryId=${categoryId}`,
        type: 'GET',
        dataType: 'html',
        success: function(data){
            fillProducts(data);
        },
        error: function(xhr, status, error)
        {
            console.log("Error: " + status + " " + error);
        }
    })
}