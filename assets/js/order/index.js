const apiUrl =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
    ? `http://localhost:4000`
    : "https://api-zerot-lowdb.onrender.com";
var curOrders;
const tbody = document.querySelector("#tbody");
var updateModal = document.getElementById("updateOrderModal");
var closeBtn = document.getElementsByClassName("close-modal")[0];
var role = localStorage.getItem("role");

const userManagementItem = document.getElementById("userManager");
if (role === "seller") {
  userManagementItem.style.display = "none"; // Ẩn phần tử quản lý người dùng
}
async function displayOrder() {
  await axios.get(`${apiUrl}/orders`).then((response) => {
    curOrders = response.data;
    const orders = response.data.reverse();
    console.log(curOrders);

    orders.forEach(async (item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `<td class="align-middle px-4">
                              <span class="text-secondary text-xs font-weight-bold">${
                                index + 1
                              }</span>
                            </td>
                            <td>
                              <!-- <p class="text-xs font-weight-bold mb-0">Manager</p>
                              <p class="text-xs text-secondary mb-0">Organization</p> -->
                              <h6 class="mb-0 text-sm">${item.user[1]}</h6>
                              <p class="text-xs text-secondary mb-0">${
                                item.user[2]
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
                              )} VNĐ </span>
                            </td>
                            <td class="align-middle text-center">
                              <a
                                style="cursor: pointer;"
                                class="updateBtn-${item.id}"
                                onclick=showPopupUpdate(${item.id})>
                                <i class="fa fa-pencil cursor-pointer" aria-hidden="true"></i>
                              </a>
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

async function showPopupUpdate(id) {
  updateModal.style.display = "block";
  var inputOrderId = document.getElementById("order-id");
  inputOrderId.value = id;

  await axios.get(`${apiUrl}/orders`).then((response) => {
    const order = response.data.find((item) => item.id === id);

    const select = document.querySelector("#status_list_edit");
    select.value = order.status;
  });
}

const handleUpdateOrder = async () => {
  const id = document.getElementById("order-id").value;
  const updatedStatus = document.getElementById("status_list_edit").value;

  await axios
    .patch(`${apiUrl}/orders/${id}`, {
      status: updatedStatus,
    })
    .then((response) => {
      toastr.success("Cập nhật thành công", "Thành công", {
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
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    })
    .catch((err) => {
      toastr.error("Cập nhật lỗi", "Lỗi", {
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
};

closeBtn.onclick = function () {
  updateModal.style.display = "none";
};

async function seeMore(orderId) {
  try {
    const response = await axios.get(`${apiUrl}/orders/${orderId}`);
    const orderData = response.data;
    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    modalTitle.textContent = `Thông tin đơn hàng: ${orderData.user[1]}`;
    orderData.orderItems.forEach((item) => {
      let sum = 0;
      modalBody.innerHTML = `
      <div class="col-2">
      <img src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/302150/s16/mac-pro-16-m2-xam-650x650.png" style="width: 100px"/>
      </div>
      <div class=" col-6"> 
        <p>${item.name}</p>
        <p>Màu:Đen</p>
      </div>
      <div class=" col-1 quantity"> 
        <p class="border-quantity"> ${item.quantity} </p>
      </div>
      <div class="col-3" style="padding-top: 27px">
        <h5 class="font-weight-bolder mb-0">
          ${(sum += item.quantity * item.price).toLocaleString("vi-VN")} VNĐ
          </h5>
      </div>
      <hr class="horizontal dark mt-1"/>
        <div class="row align-items-start">
          <div class="col-6 price">Tổng tiền: </div>
          <div class="col-6 total-price">${sum.toLocaleString(
            "vi-VN"
          )} VNĐ</div>
        </div>
      `;
    });

    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    modal.show();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
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

const productManagementItem = document.getElementById("productManager");
const dashBoardManagementItem = document.getElementById("dashBoard");
if (role === "delivery") {
  userManagementItem.style.display = "none";
  productManagementItem.style.display = "none";
  dashBoardManagementItem.style.display = "none";
}

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
