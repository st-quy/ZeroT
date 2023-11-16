let thisPage = 1;
let thisPagelaptop = 1;
let thisPagephukien = 1;
let limit = 6;
let list = [];
let listlaptop = [];
let listphukien = [];
let timeDifference = 0;
let twoDaysInMillis = 3 * 24 * 60 * 60 * 1000;


//all 
function fetchData() {
    fetch('http://localhost:4000/products')
        .then(response => response.json())
        .then(data => {
            list = data;
            loadItem();
            listPage();
        })
        .catch(error => {
            console.log(error);
        });
}

function loadItem() {
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;

    let productList = document.querySelector('.product-list');
    const sortedProducts = list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const currentDate = new Date();
    productList.innerHTML = '';

    let filteredList = sortedProducts.filter(product => !product.deletedAt);

    for (let i = beginGet; i <= endGet && i < filteredList.length; i++) {
        let item = filteredList[i];

        let productCreatedAt = new Date(item.createdAt);
        let timeDifference = currentDate - productCreatedAt;

        let productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <div class="product-container position-relative">
                <div class="form-group">
                    <img src="${item.image[0].url}"style="width: auto; display: block; margin: 0 auto"/>           
                    <h3 class="white-text">${item.name}</h3>
                    <div class="description-box">
                        <p class="description-text">${item.description}</p>
                    </div>
                    <p class="white-text">${item.price}<a>₫</a></p>
                    <div class="add-to-cart">
                        <button>Thêm vào giỏ hàng</button>
                    </div>
                </div> 
                ${timeDifference <= twoDaysInMillis
                    ? `<span class="position-absolute top-0 translate-middle badge rounded-pill bg-warning badge-product">
                            Mới
                            <span class="visually-hidden">unread messages</span>
                        </span>`
                    : ''
                }
            </div>
        `;
        productList.appendChild(productItem);
    }

    listPage();
}
function listPage() {
    let count = Math.ceil(list.filter(product => !product.deletedAt).length / limit);
    let listPageElement = document.querySelector('.listPage');
    listPageElement.innerHTML = '';

    for (let i = 1; i <= count; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if (i === thisPage) {
            newPage.classList.add('active');
        }
        newPage.addEventListener('click', function () {
            changePage(i);
        });
        listPageElement.appendChild(newPage);
    } 
}

function changePage(pageNumber) {
    thisPage = pageNumber;
    fetchData(); 
}

// laptop
function fetchDatalaptop() {
    fetch('http://localhost:4000/products')
        .then(response => response.json())
        .then(datalaptop => {
            listlaptop = datalaptop;
            loadItemlaptop();
            listPagelaptop();
        })
        .catch(error => {
            console.log(error);
        });
}

function loadItemlaptop() {
    let beginGetlaptop = limit * (thisPagelaptop - 1);
    let endGetlaptop = limit * thisPagelaptop - 1;

    let productListlaptop = document.querySelector('.product-list');
    const sortedProducts = listlaptop.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const currentDate = new Date();
    productListlaptop.innerHTML = '';

    let filteredListlaptop = sortedProducts.filter(product => !product.deletedAt && !(product.category.toLowerCase() === "phụ kiện"));

    for (let i = beginGetlaptop; i <= endGetlaptop && i < filteredListlaptop.length; i++) {
        let item = filteredListlaptop[i];

        let productCreatedAt = new Date(item.createdAt);
        let timeDifference = currentDate - productCreatedAt;

        let productItemlaptop = document.createElement('div');
        productItemlaptop.classList.add('product-item');
        productItemlaptop.innerHTML = `
            <div class="product-container position-relative">
                <div class="form-group">
                    <img src="${item.image[0].url}" style="width: auto; display: block; margin: 0 auto"/>           
                    <h3 class="white-text">${item.name}</h3>
                    <div class="description-box">
                        <p class="description-text">${item.description}</p>
                    </div>
                    <p class="white-text">${item.price}<a>₫</a></p>
                    <div class="add-to-cart">
                        <button>Thêm vào giỏ hàng</button>
                    </div>
                </div> 
                ${timeDifference <= twoDaysInMillis
                    ? `<span class="position-absolute top-0 translate-middle badge rounded-pill bg-warning badge-product">
                            Mới
                            <span class="visually-hidden">unread messages</span>
                        </span>`
                    : ''
                }
            </div>
        `;
        productListlaptop.appendChild(productItemlaptop);
    }
}

function listPagelaptop() {
    let countlaptop = Math.ceil(listlaptop.filter(product => !product.deletedAt).length / limit);
    let listPageElementlaptop = document.querySelector('.listPage');
    listPageElementlaptop.innerHTML = '';

    for (let i = 1; i <= countlaptop; i++) {
        let newPagelaptop = document.createElement('li');
        newPagelaptop.innerText = i;
        if (i === thisPagelaptop) {
            newPagelaptop.classList.add('active');
        }
        newPagelaptop.addEventListener('click', function () {
            changePagelaptop(i);
        });
        listPageElementlaptop.appendChild(newPagelaptop);
    }
   
}

function changePagelaptop(pageNumberlaptop) {
    thisPagelaptop = pageNumberlaptop;
    fetchDatalaptop();
}
//phu kien
function fetchDataphukien() {
    fetch('http://localhost:4000/products')
        .then(response => response.json())
        .then(dataphukien => {
            listphukien = dataphukien;
            loadItemphukien();
            listPagephukien();
        })
        .catch(error => {
            console.log(error);
        });
}

function loadItemphukien() {
    let beginGetphukien = limit * (thisPagephukien - 1);
    let endGetphukien = limit * thisPagephukien - 1;

    let productListphukien = document.querySelector('.product-list');
    const sortedProducts = listphukien.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const currentDate = new Date();
    productListphukien.innerHTML = '';

    let filteredListphukien = sortedProducts.filter(product => !product.deletedAt && !(product.category.toLowerCase() === "laptop"));

    for (let i = beginGetphukien; i <= endGetphukien && i < filteredListphukien.length; i++) {
        let item = filteredListphukien[i];

        let productCreatedAt = new Date(item.createdAt);
        let timeDifference = currentDate - productCreatedAt;

        let productItemphukien = document.createElement('div');
        productItemphukien.classList.add('product-item');
        productItemphukien.innerHTML = `
            <div class="product-container position-relative">
                <div class="form-group">
                    <img src="${item.image[0].url}" style="width: auto; display: block; margin: 0 auto"/>           
                    <h3 class="white-text">${item.name}</h3>
                    <div class="description-box">
                        <p class="description-text">${item.description}</p>
                    </div>
                    <p class="white-text">${item.price}<a>₫</a></p>
                    <div class="add-to-cart">
                        <button>Thêm vào giỏ hàng</button>
                    </div>
                </div> 
                ${timeDifference <= twoDaysInMillis
                    ? `<span class="position-absolute top-0 translate-middle badge rounded-pill bg-warning badge-product">
                            Mới
                            <span class="visually-hidden">unread messages</span>
                        </span>`
                    : ''
                }
            </div>
        `;
        productListphukien.appendChild(productItemphukien);
    }
}

function listPagephukien() {
    let countphukien = Math.ceil(listphukien.filter(product => !product.deletedAt).length / limit);
    let listPageElementphukien = document.querySelector('.listPage');
    listPageElementphukien.innerHTML = '';

    for (let i = 1; i <= countphukien; i++) {
        let newPagephukien = document.createElement('li');
        newPagephukien.innerText = i;
        if (i === thisPagephukien) {
            newPagephukien.classList.add('active');
        }
        newPagephukien.addEventListener('click', function () {
            changePagephukien(i);
        });
        listPageElementphukien.appendChild(newPagephukien);
    }
    
}

function changePagephukien(pageNumberphukien) {
    thisPagephukien = pageNumberphukien;
    fetchDataphukien();
}