const apiUrl =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? `http://localhost:4000`
    : "https://api-zerot-lowdb.onrender.com";
var profileData = JSON.parse(localStorage.getItem("me"));
var curOrders;
const tbody = document.querySelector("#tbody");

function showDetail(id) {
  const productList = document.querySelector(".listing-cart");
  productList.innerHTML = ""; // Xóa bỏ các phần tử con hiện tại
  const orderDetail = curOrders.find(
    (order) => Number(order.id) === Number(id)
  );
  if (orderDetail) {
    displayCart(orderDetail.orderItems);
    var modal = document.getElementById("exampleModalCenter");
    // Tạo một đối tượng modal từ tham chiếu
    var myModal = new bootstrap.Modal(modal);
    myModal.show();
  }
}
function hideFunc() {
  const productList = document.querySelector(".listing-cart");
  productList.innerHTML = ""; // Xóa bỏ các phần tử con hiện tại
  const modal = document.getElementById("exampleModalCenter");
  var myModal = bootstrap.Modal.getInstance(modal);
  myModal.hide();
}

async function displayOrder() {
  await axios.get(`${apiUrl}/orders`).then((response) => {
    const orders = response.data
      .filter((order) => Number(order.user[0]) === Number(profileData.id))
      .reverse();
    document.getElementById("orderDetails-count").textContent = orders.length;
    curOrders = orders;
    orders.forEach(async (item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `<td class="align-middle px-4">
                              <span class="text-secondary text-xs font-weight-bold">${
                                index + 1
                              }</span>
                            </td>
                            <td>
                              <p class="text-xs font-weight-bold mb-0">OID-${
                                item.totalPrice
                              }</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                            ${
                              item.status === "Processing"
                                ? `<span class='badge badge-sm bg-gradient-danger'>
                                  Đang chuẩn bị
                                </span>`
                                : item.status === "Delivering"
                                ? `<span class='badge badge-sm bg-gradient-warning'>
                                  Đang giao hàng
                                </span>`
                                : `<span class='badge badge-sm bg-gradient-success'>
                                  Đã giao hàng
                                </span>`
                            }
                            </td>
                            <td class="align-middle text-center">
                              <span class="text-secondary text-xs font-weight-bold">${item.totalPrice.toLocaleString(
                                "vi-VN"
                              )} VND </span>
                            </td>
                            <td class="align-middle text-center">
                              <a
                                style="cursor: pointer;"
                                onclick=showDetail(${item.id})
                                class="">
                                <i class="fa fa-info-circle" aria-hidden="true"></i>
                              </a>
                            </td>`;
      tbody.appendChild(row);
    });

    $("#data-table-order").DataTable({
      language: {
        paginate: {
          previous: "‹",
          next: "›",
        },
        aria: {
          paginate: {
            previous: "Previous",
            next: "Next",
          },
        },
        url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Vietnamese.json",
      },
    });
  });
}
displayOrder();

const iconNavbarSidenav = document.getElementById("iconNavbarSidenav");
const iconSidenav = document.getElementById("iconSidenav");
const sidenav = document.getElementById("sidenav-main");
let body = document.getElementsByTagName("body")[0];
let className = "g-sidenav-pinned";

if (iconNavbarSidenav) {
  iconNavbarSidenav.addEventListener("click", toggleSidenav);
}

if (iconSidenav) {
  iconSidenav.addEventListener("click", toggleSidenav);
}

function toggleSidenav() {
  if (body.classList.contains(className)) {
    body.classList.remove(className);
    setTimeout(function () {
      sidenav.classList.remove("bg-white");
    }, 100);
    sidenav.classList.remove("bg-transparent");
  } else {
    body.classList.add(className);
    sidenav.classList.add("bg-white");
    sidenav.classList.remove("bg-transparent");
    iconSidenav.classList.remove("d-none");
  }
}
function displayCart(data) {
  const productList = document.querySelector(".listing-cart");
  productList.innerHTML = ""; // Xóa bỏ các phần tử con hiện tại
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
                </div>
            </div>
            <div class="col-8 col-md-10 pt-2">
                <div class="row">
                    <div class="col-12 col-md-6">
                        <span class="nameProduct">${product.name} ${
        product.description
      }</span>
                    </div>
                    <div class="col-4 col-md-4 d-flex justify-content-center">
                    <input disabled type="text" value="${
                      product.quantity
                    }" class="product-quantity" id="input-number" name="${
        product.id
      }">
                    </div>
                    <div class="col-6 col-md-2 d-flex justify-content-center">
                        <p class="price-key">${product.price.toLocaleString(
                          "vi-VN"
                        )}VNĐ</p>
                    </div>
                </div>
            </div>
        </div>`;
      productList.appendChild(productItem);
    });
}

axios.get(`${apiUrl}/users/${profileData.id}`).then((response) => {
  document.getElementById("count-badge").textContent = response.data
    ? response.data.cartItems.length
    : 0;
});
