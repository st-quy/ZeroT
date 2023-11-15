const apiUrl = "https://api-zerot-lowdb.onrender.com/products";
const sapxep = document.getElementById("sapxep");
const sortModal = document.getElementById("sort-modal");
const sortOptions = document.querySelectorAll(".choose-sort li");

fetch(apiUrl)
  .then((response) => response.json())
  .then((products) => {
    // sortProducts("createdAt", products); // Display default (newest to oldest)
    sortProducts("createdAt"); // Display default (newest to oldest)
  })
  .catch((error) => {
    console.error("Error:", error);
  });

function displayProducts(products) {
  console.log(products);
  const productListElement = document.getElementById("productList");
  productListElement.innerHTML = ""; // Clear existing products

  const currentDate = new Date();
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.classList.add("col-12");
    productItem.classList.add("col-md-4");

    const productCreatedAt = new Date(product.createdAt);
    const timeDifference = currentDate - productCreatedAt;
    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;

    // Customize this part to display product information as needed
    if (!product.deletedAt) {
      productItem.innerHTML = `
        <div class="product-container position-relative">
          <div class="form-group">
            <img src="${
              product.image[0].url
            }" style="width: 250px; display: block; margin: 0 auto"; />           
            <h3 class="white-text">${product.name}</h3>
            <div class="description-box">
              <p class="description-text">${product.description}</p>
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
              : ""
          }
        </div>
      `;
      productListElement.appendChild(productItem);
    }
  });
}

function sortProducts(criteria) {
  const category = document.querySelector(
    ".category-container > a.active"
  ).textContent;
  if (category === "Tất cả") {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((products) => {
        switch (criteria) {
          case "createdAt":
            handleSortModal(0);
            products.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            sapxep.textContent = "Mới ra mắt";
            break;
          case "sold":
            handleSortModal(1);
            sapxep.textContent = "Bán chạy";
            break;
          case "priceDesc":
            handleSortModal(2);
            products.sort((a, b) => b.price - a.price);
            sapxep.textContent = "Giá cao đến thấp";
            break;
          case "priceAsc":
            handleSortModal(3);
            products.sort((a, b) => a.price - b.price);
            sapxep.textContent = "Giá thấp đến cao";
            break;
          default:
            break;
        }
        displayProducts(products); // Display sorted products
        closeSortModal(); // Close the modal after sorting
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  if (category === "Macbook") {
    fetch(apiUrl)
      .then(async (response) => {
        var products = await response.json();
        products = products.filter(
          (p) => p.category.toLowerCase() === "laptop"
        );
        return products;
      })
      .then((products) => {
        console.log(products);
        switch (criteria) {
          case "createdAt":
            handleSortModal(0);
            products.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            sapxep.textContent = "Mới ra mắt";
            break;
          case "sold":
            handleSortModal(1);
            sapxep.textContent = "Bán chạy";
            break;
          case "priceDesc":
            handleSortModal(2);
            products.sort((a, b) => b.price - a.price);

            sapxep.textContent = "Giá cao đến thấp";
            break;
          case "priceAsc":
            handleSortModal(3);
            products.sort((a, b) => a.price - b.price);
            sapxep.textContent = "Giá thấp đến cao";
            break;
          default:
            break;
        }
        displayProducts(products); // Display sorted products
        closeSortModal(); // Close the modal after sorting
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  if (category === "Phụ kiện") {
    fetch(apiUrl)
      .then(async (response) => {
        var products = await response.json();
        products = products.filter(
          (p) => p.category.toLowerCase() === "phụ kiện"
        );
        return products;
      })
      .then((products) => {
        console.log(products);
        switch (criteria) {
          case "createdAt":
            handleSortModal(0);
            products.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            sapxep.textContent = "Mới ra mắt";
            break;
          case "sold":
            handleSortModal(1);
            sapxep.textContent = "Bán chạy";
            break;
          case "priceDesc":
            handleSortModal(2);
            products.sort((a, b) => b.price - a.price);

            sapxep.textContent = "Giá cao đến thấp";
            break;
          case "priceAsc":
            handleSortModal(3);
            products.sort((a, b) => a.price - b.price);
            sapxep.textContent = "Giá thấp đến cao";
            break;
          default:
            break;
        }
        displayProducts(products); // Display sorted products
        closeSortModal(); // Close the modal after sorting
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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

// Add a click event listener to the "Sort Products" button
sapxep.addEventListener("click", openSortModal);

// Add click event listeners to each sorting option to close the modal when clicked
sortOptions.forEach((option) => {
  option.addEventListener("click", closeSortModal);
});

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
