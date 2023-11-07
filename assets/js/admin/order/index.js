const tbody = document.querySelector("#tbody");
var updateModal = document.getElementById("updateOrderModal");
var closeBtn = document.getElementsByClassName("close-modal")[0];

async function displayOrder() {
  await axios
    .get("https://api-zerot-lowdb.onrender.com/orders")
    .then((response) => {
      response.data.forEach(async (item, index) => {
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
                              <span class="text-secondary text-xs font-weight-bold">${
                                item.totalPrice
                              }</span>
                            </td>
                            <td class="align-middle">
                              <a
                                style="cursor: pointer;"
                                class="updateBtn-${
                                  item.id
                                } text-secondary font-weight-bold text-xs"
                                onclick=showPopupUpdate(${item.id})>
                                Cập nhật <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                              </a>
                              |
                              <a
                                style="cursor: pointer;"
                                class="text-secondary font-weight-bold text-xs"
                                onclick=seeMore(${item.id})>
                                Xem thêm <i class="fa fa-arrow-right" aria-hidden="true"></i>
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

  await axios
    .get("https://api-zerot-lowdb.onrender.com/orders")
    .then((response) => {
      const order = response.data.find((item) => item.id === id);

      const select = document.querySelector("#status_list_edit");
      select.value = order.status;
    });
}

const handleUpdateOrder = async () => {
  const id = document.getElementById("order-id").value;
  const updatedStatus = document.getElementById("status_list_edit").value;

  await axios
    .patch(`https://api-zerot-lowdb.onrender.com/orders/${id}`, {
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
    const response = await axios.get(
      `https://api-zerot-lowdb.onrender.com/orders/${orderId}`
    );
    const orderData = response.data;
    console.log(orderData.orderItems);

    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = `Thông tin đơn hàng: ${orderData.user[1]}`;
    
    modalBody.innerHTML = `
    <div class="col-2">
    <img src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/44/302150/s16/mac-pro-16-m2-xam-650x650.png" style="width: 100px"/>
    </div>
    <div class=" col-6"> 
      <p>${orderData.orderItems.name}</p>
      <p>Màu:Đen</p>
    </div>
    <div class=" col-1 quantity"> 
      <p class="border-quantity">1 </p>
    </div>
    <div class="col-3">
      <h5 class="font-weight-bolder mb-0">
        64.490.000₫ 
        </h5>
    </div>
    `;
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
}