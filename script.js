const galleryImgs = [{
    src: "./assets/gallery/image1.jpg",
    alt: "Thumbnail Image 1"
}, {
    src: "./assets/gallery/image2.jpg",
    alt: "Thumbnail Image 2"
}, {
    src: "./assets/gallery/image3.jpg",
    alt: "Thumbnail Image 3"
}]

const products = [{
            title: "AstroFiction",
            author: "John Doe",
            price: 49.9,
            image: "./assets/products/img6.png"
        },
        {
            title: "Space Odissey",
            author: "Marie Anne",
            price: 35,
            image: "./assets/products/img1.png"
        },
        {
            title: "Doomed City",
            author: "Jason Cobert",
            price: 0,
            image: "./assets/products/img2.png"
        },
        {
            title: "Black Dog",
            author: "John Doe",
            price: 85.35,
            image: "./assets/products/img3.png"
        },
        {
            title: "My Little Robot",
            author: "Pedro Paulo",
            price: 0,
            image: "./assets/products/img5.png"
        },
        {
            title: "Garden Girl",
            author: "Ankit Patel",
            price: 45,
            image: "./assets/products/img4.png"
        }
    ]
    // MENU section
function menuHandler() {
    document.getElementById("open-nav-menu").addEventListener("click", function() {
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    document.querySelector("#close-nav-menu").addEventListener("click", function() {
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

//celsius to Fahrenheit conversion
function celsiusToFahr(temperature) {
    let fahr = (temperature * 9 / 5) + 32;
    return fahr;
}


//Greeting Section
let greetingText;

function greetingHandler() {
    let currentHour = new Date().getHours();


    if (currentHour < 12) {
        greetingText = "Good Morning";
    } else if (currentHour > 12 & currentHour < 16) {
        greetingText = "Good Afternoon";
    } else if (currentHour > 16 & currentHour < 21) {
        greetingText = "Good Evening";
    } else {
        greetingText = "Good Night";
    }
    document.querySelector("#greeting").innerHTML = greetingText;

}

//Weather Section
function weatherHandler() {
    navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let url = weatherAPIURL
            .replace("{lat}", latitude)
            .replace("{lon}", longitude)
            .replace("{API key}", weatherAPIKey);
        fetch(url)
            .then(response => response.json())
            .then(data => {

                const Condition = data.weather[0].description;
                const Location = data.name;
                const temperature = data.main.temp;

                let celsiusText = `The weather is ${Condition} in ${Location} and it's ${temperature.toFixed(1)}°C outside.`;
                let fahrText = `The weather is ${Condition} in ${Location} and it's ${celsiusToFahr(temperature).toFixed(1)}°F outside.`;

                document.querySelector("p#weather").innerHTML = celsiusText;


                document.querySelector(".weather-group").addEventListener("click", function(e) {
                    if (e.target.id == "fahr") {
                        document.querySelector("p#weather").innerHTML = fahrText;
                    } else if (e.target.id == "celsius") {
                        document.querySelector("p#weather").innerHTML = celsiusText;
                    }
                });

            }).catch(err => {
                document.querySelector("p#weather").innerHTML = "Unable to get weather info."
            });
    });
};


//Time Section
function timeHandler() {
    setInterval(function() {
        let localTime = new Date();

        document.querySelector("span[data-time=hours]").textContent = localTime.getHours().toString().padStart(2, "0");
        document.querySelector("span[data-time=minutes]").textContent = localTime.getMinutes().toString().padStart(2, "0");
        document.querySelector("span[data-time=seconds]").textContent = localTime.getSeconds().toString().padStart(2, "0");

    }, 1000);
}


//Gallery section
// src="./assets/gallery/image1.jpg" alt="Thumbnail Image 1"

//option + shift + a


function galleryHandler() {
    let mainImg = document.querySelector("#gallery > img");
    let thumbnails = document.querySelector("#gallery .thumbnails");
    mainImg.src = galleryImgs[0].src;
    mainImg.alt = galleryImgs[0].alt;
    // <img src = "./assets/gallery/image1.jpg" alt = "Thumbnail Image 1" data - array - index = "0" data - selected = "true" >
    // <img src = "./assets/gallery/image2.jpg" alt = "Thumbnail Image 2" data - array - index = "1" data - selected = "false" >
    //<img src = "./assets/gallery/image3.jpg" alt = "Thumbnail Image 3" data - array - index = "2" data - selected = "false" >



    galleryImgs.forEach(function(image, index) {
        let thumb = document.createElement("img");
        thumb.src = image.src;
        thumb.alt = image.alt;
        thumb.dataset.arrayIndex = index;
        thumb.dataset.selected = index === 0 ? true : false;

        //condition ? exprIfTrue : exprIfFalse
        thumb.addEventListener("click", function(e) {
            let selectedIndex = e.target.dataset.arrayIndex;
            let selectedImg = galleryImgs[selectedIndex];
            mainImg.src = selectedImg.src;
            mainImg.alt = selectedImg.alt;

            thumbnails.querySelectorAll("img").forEach(function(img) {
                img.dataset.selected = false;
            });
            e.target.dataset.selected = true;
        });
        thumbnails.appendChild(thumb);
    });
};
//Product section

function populateProducts(productList) {
    let productSection = document.querySelector(".products-area");
    productSection.textContent = "";




    productList.forEach(function(product, index) {
        // create the HTML element for the individual product 
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");
        //create the product image 
        let productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt = product.title;

        //creating product details section 
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        //creating product style (title, author, price-title and price)
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        //author 
        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        //price-title 
        let productPriceTitle = document.createElement("p");
        productPriceTitle.classList.add("price-title");
        productPriceTitle.textContent = "Price";

        //price 
        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";


        //adding all product details
        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(productPriceTitle);
        productDetails.append(productPrice);



        //add all child elements into the parent element
        productElm.append(productImg);
        productElm.append(productDetails);
        //add the entire product element in the product section
        productSection.append(productElm);
    });
}

function productsHandler() {

    let productSection = document.querySelector(".products-area");

    let freeProducts = products.filter(item => !item.price || item.price <= 0);
    let paidProducts = products.filter(function(item) {
        return item.price > 0;
    });
    // console.log(freeProducts, paidProducts);
    //loop through the products and create and HTML element ("product-item") for each of them
    products.forEach(function(product, index) {
        // create the HTML element for the individual product 
        let productElm = document.createElement("div");
        productElm.classList.add("product-item");
        //create the product image 
        let productImg = document.createElement("img");
        productImg.src = product.image;
        productImg.alt = product.title;

        //creating product details section 
        let productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        //creating product style (title, author, price-title and price)
        let productTitle = document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent = product.title;

        //author 
        let productAuthor = document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent = product.author;

        //price-title 
        let productPriceTitle = document.createElement("p");
        productPriceTitle.classList.add("price-title");
        productPriceTitle.textContent = "Price";

        //price 
        let productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = product.price > 0 ? "$" + product.price.toFixed(2) : "Free";


        //adding all product details
        productDetails.append(productTitle);
        productDetails.append(productAuthor);
        productDetails.append(productPriceTitle);
        productDetails.append(productPrice);



        //add all child elements into the parent element
        productElm.append(productImg);
        productElm.append(productDetails);
        //add the entire product element in the product section
        productSection.append(productElm);
    });
    populateProducts(products);


    //filtering the array 
    document.querySelector(".products-filter label[for=all] span.product-amount").textContent = products.length;
    document.querySelector(".products-filter label[for=paid] span.product-amount").textContent = paidProducts.length;
    document.querySelector(".products-filter label[for=free] span.product-amount").textContent = freeProducts.length;

    let productsFilter = document.querySelector(".products-filter");
    productsFilter.addEventListener("click", function(e) {
        if (e.target.id === "all") {
            populateProducts(products);
        } else if (e.target.id === "paid") {
            populateProducts(paidProducts);

        } else if (e.target.id === "free") {
            populateProducts(freeProducts);
        }
    });

};

//footer section 
function footerHandler() {
    let currentYear = new Date().getFullYear();
    document.querySelector("footer").textContent = `© ${currentYear} - All rights reserved`
}

// user location 
const weatherAPIKey = "77e18a13347007340d2aeae71dd7cd01"
const weatherAPIURL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric`





//Page load
menuHandler();
greetingHandler();

timeHandler();
galleryHandler();
productsHandler();
footerHandler();
weatherHandler();