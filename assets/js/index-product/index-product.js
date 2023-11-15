const url = 'http://localhost:4000/products';
chooseCategory('tất cả');

function displayProduct(products) {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = '';
  const sortedProducts = products.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const currentDate = new Date();

  sortedProducts.forEach((product) => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.classList.add('col-12');
    productItem.classList.add('col-md-4');

    const productCreatedAt = new Date(product.createdAt);
    const timeDifference = currentDate - productCreatedAt;
    const twoDaysInMillis = 3 * 24 * 60 * 60 * 1000;

    if (!product.deletedAt) {
      productItem.innerHTML = `
                    <div class="product-container position-relative">
                        <div class="form-group">
                            <img src="${
                              product.image[0].url
                            }" style="width: auto; display: block; margin: 0 auto"; />           
                            <h3 class="white-text">${product.name}</h3>
                            <div class="description-box">
                                <p class="description-text">${
                                  product.description
                                }</p>
                            </div>
                            <p class="white-text">${product.price}<a>₫</a></p>
                            <div class="add-to-cart">
                                <button>Thêm vào giỏ hàng</button>
                            </div>
                        </div> 
                        ${
                          timeDifference <= twoDaysInMillis
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
  });
  document.getElementById('search-input').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    let filterData = [];
    if (searchData.trim() !== '') {
      filterData = products.filter((item) => {
        return !item.deletedAt && item.name.toLowerCase().includes(searchData);
      });
    } else {
      filterData = products.filter((item) => {
        return !item.deletedAt;
      });
    }
    if (filterData.length > 0) {
      displayItem(filterData);
    } else {
      productList.innerHTML = `Không tìm thấy sản phẩm có từ khóa '${searchData}'`;
      productList.style.fontSize = '20px';
      productList.style.color = 'white';
    }
  });
  const displayItem = (items) => {
    productList.innerHTML = '';

    items.forEach((item) => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      productItem.classList.add('col-12');
      productItem.classList.add('col-md-4');

      const productCreatedAt = new Date(item.createdAt);
      const timeDifference = currentDate - productCreatedAt;
      const twoDaysInMillis = 3 * 24 * 60 * 60 * 1000;

      productItem.innerHTML = `
      <div class="product-container position-relative">
        <div class="form-group">
          <img src="${
            item.image[0].url
          }" style="width: auto; display: block; margin: 0 auto;" />
          <h3 class="white-text">${item.name}</h3>
          <div class="description-box">
            <p class="description-text">${item.description}</p>
          </div>
          <p class="white-text">${item.price}<a>₫</a></p>
          <div class="add-to-cart">
            <button>Thêm vào giỏ hàng</button>
          </div>
        </div>
        ${
          timeDifference <= twoDaysInMillis
            ? `<span class="position-absolute top-0 translate-middle badge rounded-pill bg-warning badge-product">
                Mới
                <span class="visually-hidden">unread messages</span>
              </span>`
            : ''
        }
      </div>
    `;

      productList.appendChild(productItem);
    });
  };
}

function chooseCategory(category) {
  fetch(url)
    .then((response) => response.json())
    .then((products) => {
      switch (category) {
        case 'tất cả':
          handleCategoryTag(0);
          sortProducts("createdAt");
          break;
        case 'macbook':
          handleCategoryTag(1);
          sortProducts("createdAt");
          products = products.filter(
            (p) => p.category.toLowerCase() === 'laptop'
          );
          break;
        case 'phụ kiện':
          handleCategoryTag(2);
          sortProducts("createdAt");

          products = products.filter(
            (p) => p.category.toLowerCase() === 'phụ kiện'
          );
          break;
      }
      displayProduct(products);
    });
}

function handleCategoryTag(active) {
  const categoriesTag = document.querySelectorAll('.category-container > a');
  for (var i = 0; i < categoriesTag.length; i++) {
    if (i === active) {
      categoriesTag[i].classList.add('active');
      continue;
    }
    categoriesTag[i].classList.remove('active');
  }
}
