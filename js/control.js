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
$.ajax({
    url:  'http://localhost:3000/categories',
    dataType: 'html',
    type: 'GET',
    success: function(data){
        fillInputCategory(data);
    },
    error: function(error){
        console.log(error);
    }
})


function fillInputCategory(data){
    let categories = JSON.parse(data);
    let select = document.getElementById("category");

    for(let i=0;i<categories.length;i++){
        let option = document.createElement("option");
        option.innerHTML = categories[i].name;
        option.id = categories[i].id;
        select.appendChild(option);
    }
}

$.ajax({//povlacimo proizvode
    url: ' http://localhost:3000/products',
    type: 'GET', //GET -- za povlacenje podataka,PUT -- azuriranje, POST -- dodavanje
    dataType: 'html',
    success: function(data)
    {
        fillTableContent(data);
    },
    error: function(xhr, status, error)
    {
       console.log("Error: " + status + " " + error);
    }
});


function add(){
    let headline = document.getElementById("headline").value;
    let price = document.getElementById("price").value;
    let image = document.getElementById("image").value;
    let select = document.getElementById("category");
    let categoryId = select.options[select.selectedIndex].id;

    let product = {
        headline: headline,
        price: price,
        image: image,
        categoryId: categoryId,
    }

    addNewProductInDB(product);
}

function addNewProductInDB(product){
    $.ajax({
        url: ' http://localhost:3000/products',
        data: product,
        type: 'POST',
        success: function(status){
            console.log("Uspesno", status);
        },
        error: function(error){
            console.log(error);
        }
    })
}

function fillTableContent(data){
    let products = JSON.parse(data);
    let tBody = document.getElementById("tableContent");

    for(let i=0;i<products.length;i++){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = products[i].id;
        let td2 = document.createElement("td");
        td2.innerHTML = products[i].headline;
        let td3 = document.createElement("td");
        td3.innerHTML = products[i].price;
        let td4 = document.createElement("td");
        td4.innerHTML = products[i].categoryId;

        let td5 = document.createElement("td");
        td5.innerHTML = `<button class="btn btn-danger" onclick="deleteProduct(${products[i].id})">Delete</button>`;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        

        tBody.appendChild(tr);
    }
}

function deleteProduct(productId){
    $.ajax({
        url: `http://localhost:3000/products/${productId}`,
        type: 'DELETE', //kako bi izvrsili brisanje,
        success: function(status){
            console.log("Delete ok");
        },
        error: function(error){
            alert("Delete error " + error);
        }
    })
}