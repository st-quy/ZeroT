let thisPage = 1;
let limit = 9;
let list = [];
let timeDifference = 0;
let twoDaysInMillis = 3 * 24 * 60 * 60 * 1000;

function fetchData() {
    fetch('https://api-zerot-lowdb.onrender.com/products')
        .then(response => response.json())
        .then(data => {
            list = data;
            loadItem();
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

        // Calculate time difference
        let productCreatedAt = new Date(item.createdAt);
        let timeDifference = currentDate - productCreatedAt;

        let productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <div class="product-container position-relative">
                <div class="form-group">
                    <img src="${item.image[0].url}" style="width: 250px; display: block; margin: 0 auto" />           
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

    if (thisPage !== 1) {
        let prev = document.createElement('li');
        prev.innerText = 'Lùi về';
        prev.addEventListener('click', function () {
            changePage(thisPage - 1);
        });
        listPageElement.appendChild(prev);
    }

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

    if (thisPage !== count) {
        let next = document.createElement('li');
        next.innerText = 'Trang mới';
        next.addEventListener('click', function () {
            changePage(thisPage + 1);
        });
        listPageElement.appendChild(next);
    }
}

function changePage(pageNumber) {
    thisPage = pageNumber;
    loadItem();
}

fetchData();