const url = 'https://api-zerot-lowdb.onrender.com/products';

fetch(url)
    .then(response => response.json())
    .then(products => {
        const productList = document.querySelector('.product-list');
        const productsPerRow = 1;
        let count = 0;
        let productRow = document.createElement("div");
        productRow.classList.add("product-row");

        products.forEach(product => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");
            if (!product.deletedAt) {
                productItem.innerHTML = `
        <div class="product-container">
            <div class="form-group">
                    <img src="${product.image[0].url}" style="width: 250px; display: block; margin: 0 auto"; />           
                    <h3 class="white-text">${product.name}</h3>
                <div class="description-box">
                 <p class ="desription-text">${product.description}</p>
                </div>
                 <p class="white-text">${product.price}<a>₫</a></p>
                <div class="add-to-cart">
                 <button>Thêm vào giỏ hàng</button>
                </div>
            </div>
        </div>
            `;

                productRow.appendChild(productItem);
                count++;

                if (count % productsPerRow === 0) {
                    productList.appendChild(productRow);
                    productRow = document.createElement("div");
                    productRow.classList.add("product-row");
                }
            }
        });

        if (count % productsPerRow !== 0) {
            productList.appendChild(productRow);
        }
        // if (prductsPerRox > 3) {
        //     products.interHTML = `   
        //     <div class="abc">
        //      <p>acb</p>   
        //        </div>`;
        // }

    })
    .catch(error => {
        console.error('Error:', error);
    });