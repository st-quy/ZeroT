document.addEventListener("DOMContentLoaded", function () {
  var titleProduct = document.getElementById("title-product");
  var price = document.getElementById("price");
  var description = document.getElementById("description");
  var imgElement = document.getElementById("img");
  getProductData(localStorage.getItem("idProduct"))
    .then(function (product) {
      // Cập nhật các phần tử trên trang với dữ liệu sản phẩm
      titleProduct.innerText = product.name;
      price.innerText = `${product.price.toLocaleString("vi-VN")}VNĐ`;
      description.innerText = product.description;
      imgElement.src = product.image[0].url;
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
});

async function getProductData(productId) {
  try {
    var response = await axios.get(`${apiUrl}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

// Add to cart
const addToCartModal = document.getElementById("add-to-cart-alert");
const addToCartMessage = document.getElementById("add-to-cart-message");
async function addToCart() {
  const apiUrl =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
      ? "http://localhost:4000"
      : "https://api-zerot-lowdb.onrender.com";
  const isLogin = JSON.parse(localStorage.getItem("isLogin"));
  const role = localStorage.getItem("role");
  const user = JSON.parse(localStorage.getItem("me"));

  const userId = user?.id;

  if (!isLogin) {
    addToCartModal.style.display = "block";
    return;
  }

  if (isLogin && role !== "customer") {
    addToCartAction.textContent = "Đăng xuất";
    addToCartAction.href = `${location.origin}/index.html`;
    addToCartModal.style.display = "block";
    addToCartAction.addEventListener("click", () => {
      localStorage.removeItem("me");
      localStorage.removeItem("role");
      localStorage.removeItem("isLogin");
      setTimeout(function () {
        location.href = `${location.origin}/index.html`;
      }, 500);
    });
    return;
  }
  if (isLogin && role === "customer" && user.status === "inactive") {
    addToCartAction.textContent = "Kích hoạt tài khoản";
    addToCartAction.href = `${location.origin}/index.html`;
    addToCartMessage.textContent =
      "Tài khoản của bạn chưa active. Vui lòng nhập code để kích hoạt tài khoản";

    addToCartModal.style.display = "block";
    addToCartAction.addEventListener("click", () => {
      setTimeout(function () {
        location.href = `${location.origin}/index.html`;
      }, 500);
    });
    return;
  }

  if (isLogin && role === "customer" && user.status === "active") {
    await axios.get(`${apiUrl}/users`).then(async (response) => {
      const user = response.data.find((u) => u.id === userId);
      await axios.get(`${apiUrl}/products`).then(async (response) => {
        var prdId = localStorage.getItem("idProduct");
        console.log(typeof prdId);
        const product = response.data.find(
          (p) => Number(p.id) === Number(prdId)
        );
        console.log(product);

        var prdObject = {
          id: product.id,
          image: product.image,
          price: product.price,
          description: product.description,
          name: product.name,
          category: product.category,
          quantity: 1,
        };
        if (user.cartItems) {
          if (user.cartItems.length > 0) {
            let prdFound = false;
            for (let i = 0; i < user.cartItems.length; i++) {
              if (user.cartItems[i].id === prdObject.id) {
                user.cartItems[i].quantity += 1;
                prdFound = true;
                break;
              }
            }
            if (!prdFound) user.cartItems.push(prdObject);
          } else {
            user.cartItems.push(prdObject);
          }
        } else {
          user.cartItems = [prdObject];
        }

        await axios
          .patch(`${apiUrl}/users/${userId}`, {
            cartItems: user.cartItems,
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
            num.textContent = user.cartItems.length;
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
