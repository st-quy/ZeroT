const apiUrl =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? `http://localhost:4000`
    : "https://api-zerot-lowdb.onrender.com";

var profileData = JSON.parse(localStorage.getItem("me"));
var curItems;

document.querySelector(".cartempty-content").style.display = "none";
document.querySelector(".payment-container").style.display = "none";
document.querySelector(".order-success").style.display = "none";

async function handlePaymentDisplay(params) {
  switch (params) {
    case "Thanh Toán":
      document.querySelector(".cart-content").style.display = "none";
      document.querySelector(".payment-container").style.display = "block";
      break;
    case "Đặt Hàng":
      var paymentContainer = document.querySelector(".payment-container");

      var inputName = paymentContainer.querySelector("#inputName").value;

      var inputPhone = paymentContainer.querySelector("#inputPhone").value;

      var inputAddress = paymentContainer.querySelector("#inputAdd").value;
      if (!inputName || !inputPhone || !inputAddress) {
        return toastr.warning("Vui lòng điền đầy đủ thông tin", "Message", {
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
      }
      var genderRadioButtons = paymentContainer.querySelectorAll(
        '.infor-customer input[name="inlineRadioOptions"]'
      );

      var selectedGender;

      for (var i = 0; i < genderRadioButtons.length; i++) {
        if (genderRadioButtons[i].checked) {
          selectedGender = genderRadioButtons[i].value;
          break;
        }
      }
      var deliveryRadioButtons = paymentContainer.querySelectorAll(
        '.row input[name="deliveryOptions"]'
      );
      var selectedDeliveryOption;

      for (var i = 0; i < deliveryRadioButtons.length; i++) {
        if (deliveryRadioButtons[i].checked) {
          selectedDeliveryOption = deliveryRadioButtons[i].value;
          break;
        }
      }
      const numberd = parseFloat(
        document
          .getElementById("temp-total-money")
          .textContent.replace(/\./g, "")
          .replace("VNĐ", "")
      );
      if (selectedDeliveryOption === "momo") {
        await axios
          .post("https://momo-payment.onrender.com/checkout", {
            amount: numberd / 100,
            redirectUrl: `${
              window.location.hostname === "localhost" ||
              window.location.hostname === "127.0.0.1"
                ? `http://${window.location.hostname}:5501`
                : "https://zerot.onrender.com"
            }/cart.html`,
            orderId: numberd / 100,
          })
          .then((response) => {
            window.location.href = response.data.data;
          })
          .catch((error) => {
            console.log(error.message);
          });
      } else {
        await axios
          .post(`${apiUrl}/orders`, {
            totalPrice: numberd,
            orderItems: curItems,
            status: "Processing",
            user: [Number(profileData.id), profileData.name, profileData.email],
          })
          .then((response) => {
            document.getElementById("orderDetails-count").textContent =
              parseInt(
                document.getElementById("orderDetails-count").textContent
              ) + 1;
            document.getElementById("count-badge").textContent = 0;
            const productList = document.querySelector(".listing-cart");
            productList.innerHTML = "";
            axios
              .patch(`${apiUrl}/users/${profileData.id}`, {
                cartItems: [],
              })
              .then((response) => {
                document.querySelector(".payment-container").style.display =
                  "none";
                document.querySelector(".cartempty-content").style.display =
                  "none";
                document.querySelector(".order-success").style.display =
                  "block";
                curItems = [];
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      }

      break;
  }
}
function displayCart(data) {
  if (!data || (data && data.length <= 0)) {
    document.querySelector(".cart-content").style.display = "none";
    document.querySelector(".payment-container").style.display = "none";
    document.querySelector(".cartempty-content").style.display = "block";
  }
  document.getElementById("count-badge").textContent = data ? data.length : 0;
  document.getElementById("quanlity-product").textContent = data
    ? data.length
    : 0;
  document.getElementById("temp-total-money").textContent =
    data &&
    `${data
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toLocaleString("vi-VN")}VNĐ`;
  const productList = document.querySelector(".listing-cart");
  if (data && data.length > 0) curItems = data;

  data &&
    data.forEach((product, index) => {
      const productItem = document.createElement("div");
      productItem.innerHTML = `<div class="row pt-2">
              <div class="col-4 col-md-2">
                  <div class="row">
                      <div class="col-12">
                          <img src="${product.image[0].url}"
                              alt="${product.name}" loading="lazy"
                              class="imgProduct">
                      </div>
                      <div class="btn-clear col-12" onclick="handleDelete(${
                        product.id
                      })">
                          Xóa
                      </div>
                  </div>
              </div>
              <div class="col-8 col-md-10">
                  <div class="row">
                      <div class="col-12 col-md-8">
                          <span class="nameProduct">${product.name} ${
        product.description
      }</span>
                      </div>
                      <div class="col-12 col-md-4 d-flex align-items-end flex-column justify-content-end">
                          <p class="price-key">${product.price.toLocaleString(
                            "vi-VN"
                          )}VNĐ</p>
                          <p class="price-subkey"><s>${(
                            product.price * 1.2
                          ).toLocaleString("vi-VN")}VNĐ</s></p>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-12 col-md-12 pt-2 d-flex align-items-center justify-content-end">
                          <div class="input-group">
                              <div class="input-group-prepend">
                                  <button class=" btn-outline-secondary btn-decrease" type="button"
                                      onclick="handleClick(this, 'decrease')" id="button-addon1">-</button>
                              </div>
                              <input type="text" value="${
                                product.quantity
                              }" class="product-quantity" id="input-number" name="${
        product.id
      }">
                              <div class="input-group-prepend">
                                  <button class=" btn-outline-secondary btn-increase" type="button" id="button-addon2"
                                      onclick="handleClick(this, 'increase')">+</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>`;
      productList.appendChild(productItem);
    });
}

axios.get(`${apiUrl}/users/${profileData.id}`).then((response) => {
  displayCart(response.data.cartItems);
});

axios.get(`${apiUrl}/orders`).then((response) => {
  const orders = response.data.filter(
    (order) => Number(order.user[0]) === Number(profileData.id)
  );
  document.getElementById("orderDetails-count").textContent = orders.length;
});

async function handleClick(button, action) {
  if (action === "decrease") {
    const input = button.parentNode.nextElementSibling;
    let quantity = parseInt(input.value);
    if (quantity > 1) {
      quantity--;
      const productToUpdate = curItems.find(
        (product) => parseInt(product.id) === parseInt(input.name)
      );
      if (productToUpdate) {
        productToUpdate.quantity = quantity;
        await axios
          .patch(`${apiUrl}/users/${profileData.id}`, {
            cartItems: curItems,
          })
          .then((response) => {
            document.querySelector(".listing-cart").innerHTML = "";
            displayCart(curItems);
          });
      }
      return (input.value = quantity);
    }
  } else {
    const input = button.parentNode.previousElementSibling;
    let quantity = parseInt(input.value);
    quantity++;
    const productToUpdate = curItems.find(
      (product) => parseInt(product.id) === parseInt(input.name)
    );
    if (productToUpdate) {
      productToUpdate.quantity = quantity;
      await axios
        .patch(`${apiUrl}/users/${profileData.id}`, {
          cartItems: curItems,
        })
        .then((response) => {
          document.querySelector(".listing-cart").innerHTML = "";
          displayCart(curItems);
        });
    }
    return (input.value = quantity);
  }
}

async function handleDelete(id) {
  const dataDelete = curItems.filter((item) => Number(item.id) !== Number(id));

  const productList = document.querySelector(".listing-cart");
  productList.innerHTML = ""; // Xóa bỏ các phần tử con hiện tại
  if (dataDelete && dataDelete.length <= 0) {
    document.querySelector(".cart-content").style.display = "none";
    document.querySelector(".cartempty-content").style.display = "block";
  }
  await axios
    .patch(`${apiUrl}/users/${profileData.id}`, {
      cartItems: dataDelete,
    })
    .then((response) => {
      curItems = dataDelete;
      displayCart(dataDelete);
    });
}

var parsedUrl = new URL(window.location.href);

var message = parsedUrl.searchParams.get("message");
if (message === "Thành công.") {
  var totalAmount = parseFloat(parsedUrl.searchParams.get("amount")) * 100;

  axios
    .post(`${apiUrl}/orders`, {
      totalPrice: totalAmount,
      orderItems: curItems,
      status: "Processing",
      user: [Number(profileData.id), profileData.name, profileData.email],
    })
    .then(function () {
      const productList = document.querySelector(".listing-cart");
      productList.innerHTML = "";
      axios
        .patch(`${apiUrl}/users/${profileData.id}`, {
          cartItems: [],
        })
        .then((response) => {
          curItems = [];
          displayCart([]);
        });
      setTimeout(() => {
        window.location.href = `${window.location.origin}/cart.html`;
      }, 500);
    });
}
