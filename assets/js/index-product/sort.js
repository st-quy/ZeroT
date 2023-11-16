const apiUrl = `${
  window.location.hostname === "localhost" || "127.0.0.1"
    ? "http://localhost:4000"
    : "https://api-zerot-lowdb.onrender.com"
}/products`;
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

// ADD TO CART

const addToCartModal = document.getElementById("add-to-cart-alert");
async function addToCart(prdId) {
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("me"));

  const userId = user?.id;

  if (!isLogin || (isLogin && role !== "customer")) {
    addToCartModal.style.display = "block";
  }

  if (isLogin && role === "customer") {
    await axios.get("http://localhost:4000/users").then(async (response) => {
      const user = response.data.find((u) => u.id === userId);

      await axios
        .get("http://localhost:4000/products")
        .then(async (response) => {
          const product = response.data.find((p) => Number(p.id) === prdId);

          var prdObject = {
            id: product.id,
            image: product.image,
            price: product.price,
            description: product.description,
            name: product.name,
            category: product.category,
            quantity: 1,
          };
          if (user.cart) {
            if (user.cart.length > 0) {
              let prdFound = false;
              for (let i = 0; i < user.cart.length; i++) {
                if (user.cart[i].id === prdObject.id) {
                  user.cart[i].quantity += 1;
                  prdFound = true;
                  break;
                }
              }
              if (!prdFound) user.cart.push(prdObject);
            } else {
              user.cart.push(prdObject);
            }
          } else {
            user.cart = [prdObject];
          }

          await axios
            .patch(`http://localhost:4000/users/${userId}`, {
              cart: user.cart,
            })
            .then((res) => {
              toastr.success("Thêm vào giỏ hàng thành công", "Message", {
                timeOut: 2000,
                closeButton: true,
                debug: false,
                newestOnTop: true,
                progressBar: true,
                positionClass: "toast-top-right",
                preventDuplicates: true,
                onclick: null,
                showDuration: "300",
                hideDuration: "1000",
                extendedTimeOut: "1000",
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut",
                tapToDismiss: false,
              });
              num.textContent = user.cart.length;
            })
            .catch((err) => {
              toastr.error("Không thể thêm vào giỏ hàng", "Message", {
                timeOut: 2000,
                closeButton: true,
                debug: false,
                newestOnTop: true,
                progressBar: true,
                positionClass: "toast-top-right",
                preventDuplicates: true,
                onclick: null,
                showDuration: "300",
                hideDuration: "1000",
                extendedTimeOut: "1000",
                showEasing: "swing",
                hideEasing: "linear",
                showMethod: "fadeIn",
                hideMethod: "fadeOut",
                tapToDismiss: false,
              });
            });
        });
    });
  }
}

function closeAddToCartAlert() {
  addToCartModal.style.display = "none";
}
