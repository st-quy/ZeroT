const url = `${
  window.location.hostname === "localhost" || "127.0.0.1"
    ? "http://localhost:4000"
    : "https://api-zerot-lowdb.onrender.com"
}/products`;

var currentPage = 1;
const productsPerPage = 6;
const pagination = document.getElementById("pagination");
const prevButton = pagination.querySelector('[aria-label="Previous"]');
const nextButton = pagination.querySelector('[aria-label="Next"]');

const sortModal = document.getElementById("sort-modal");
const sortOptions = document.querySelectorAll(".choose-sort li");
var curProducts;
sapxep.addEventListener("click", openSortModal);

chooseCategory("tất cả");
handleSortModal(0);

function handleSortModal(index) {
  const checkselection = document.querySelectorAll("#sort-modal > li");
  for (let i = 0; i < checkselection.length; i++) {
    if (i === index) {
      checkselection[i].classList.add("active");
      continue;
    }
    checkselection[i].classList.remove("active");
  }
}

function handleSortClick(products) {
  const sortType = document.getElementById("sapxep").textContent;
  if (products && products.length > 0) {
    switch (sortType) {
      case "Mới ra mắt":
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Bán chạy":
        break;
      case "Giá thấp đến cao":
        products.sort((a, b) => a.price - b.price);
        break;
      case "Giá cao đến thấp":
        products.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    return products;
  }
  switch (sortType) {
    case "Mới ra mắt":
      curProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "Bán chạy":
      break;
    case "Giá thấp đến cao":
      products.sort((a, b) => a.price - b.price);
      break;
    case "Giá cao đến thấp":
      products.sort((a, b) => b.price - a.price);
      break;
    default:
      break;
  }
  return curProducts;
}

async function displayProduct(products) {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";

  const sortedProducts = (
    products && products.length > 0 ? products : curProducts
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const dataSort = await handleSortClick(sortedProducts);

  if (dataSort) curProducts = dataSort;

  const currentDate = new Date();

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = dataSort.slice(startIndex, endIndex);

  currentProducts.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.classList.add("col-12");
    productItem.classList.add("col-md-4");

    const productCreatedAt = new Date(product.createdAt);
    const timeDifference = currentDate - productCreatedAt;
    const twoDaysInMillis = 3 * 24 * 60 * 60 * 1000;

    if (!product.deletedAt) {
      productItem.innerHTML = `
                    <div class="product-container position-relative">
                        <div class="form-group">
                            <img src="${
                              product.image[0].url
                            }" style="width: 250px; display: block; margin: 0 auto"; />           
                            <h3 class="white-text">${product.name}</h3>
                            <div class="description-box">
                                <p class="description-text">${
                                  product.description
                                }</p>
                            </div>
                            <p class="white-text">${product.price}<a>₫</a></p>
                            <div class="add-to-cart">
                                <button onclick="addToCart(${
                                  product.id
                                })">Thêm vào giỏ hàng</button>
                            </div>
                        </div> 
                        ${
                          timeDifference <= twoDaysInMillis
                            ? `<span class="position-absolute top-0 translate-middle badge rounded-pill bg-warning badge-product">
                                    Mới
                                    <span class="visually-hidden">unread messages</span>
                                </span>`
                            : ""
                        }
                    </div>
                `;
      productList.appendChild(productItem);
    }
  });
  const totalPages = Math.ceil(dataSort.length / productsPerPage);
  updatePaginationButtons(totalPages);
}

document.getElementById("search-input").addEventListener("keyup", (e) => {
  const searchData = e.target.value.toLowerCase();
  let filterData = [];
  if (searchData.trim() !== "") {
    filterData = curProducts.filter((item) => {
      return item.name.toLowerCase().includes(searchData);
    });
  } else {
    filterData = curProducts;
  }
  if (filterData.length > 0) {
    displayProduct(filterData);
  } else {
    productList.innerHTML = `Không tìm thấy sản phẩm có từ khóa '${searchData}'`;
    productList.style.fontSize = "20px";
    productList.style.color = "white";
  }
});

function chooseCategory(category) {
  currentPage = 1; // Đặt lại trang hiện tại về 1
  document.getElementById("search-input").value = "";
  fetch(url)
    .then((response) => response.json())
    .then((products) => {
      products = products.filter((product) => !product.deletedAt);

      switch (category) {
        case "tất cả":
          handleCategoryTag(0);
          break;
        case "macbook":
          handleCategoryTag(1);
          products = products.filter(
            (p) => p.category.toLowerCase() === "laptop"
          );
          break;
        case "phụ kiện":
          handleCategoryTag(2);
          products = products.filter(
            (p) => p.category.toLowerCase() === "phụ kiện"
          );
          break;
      }
      displayProduct(products);
    });
}

function handleCategoryTag(active) {
  const categoriesTag = document.querySelectorAll(".category-container > a");
  for (var i = 0; i < categoriesTag.length; i++) {
    if (i === active) {
      categoriesTag[i].classList.add("active");
      continue;
    }
    categoriesTag[i].classList.remove("active");
  }
}

function openSortModal() {
  sortModal.style.display =
    sortModal.style.display === "none" || sortModal.style.display === ""
      ? "block"
      : "none";
}

function closeSortModal() {
  sortModal.style.display = "none";
}
function handleSort(data) {
  sapxep.textContent = data.textContent;
  displayProduct();
  handleSortModal(Number(data.value));
  closeSortModal();
}

function updatePaginationButtons(totalPages) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  // Tạo nút Previous
  const previousButton = createPageButton("Previous", "&laquo;");
  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayProduct();
    }
  });
  pagination.appendChild(previousButton);

  // Tạo các nút số trang
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = createPageButton(i, i);
    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayProduct();
    });
    pagination.appendChild(pageButton);
  }

  // Tạo nút Next
  const nextButton = createPageButton("Next", "&raquo;");
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayProduct();
    }
  });
  pagination.appendChild(nextButton);

  // Cập nhật trạng thái của các nút phân trang
  const pageButtons = pagination.querySelectorAll(".page-link");
  pageButtons.forEach((button) => {
    if (parseInt(button.textContent) == currentPage) {
      button.parentElement.classList.add("active");
    } else {
      button.parentElement.classList.remove("active");
    }
  });
}

function createPageButton(pageNumber, label) {
  const li = document.createElement("li");
  li.classList.add("page-item");
  const a = document.createElement("a");
  a.classList.add("page-link");
  a.href = "javascript:;";
  a.setAttribute("aria-label", label);
  a.innerHTML = `<span aria-hidden="true">${label}</span>
                 <span class="sr-only">${label}</span>`;
  a.setAttribute("data-page", pageNumber);
  li.appendChild(a);
  return li;
}
