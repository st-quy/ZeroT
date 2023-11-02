const orders = document.querySelector("#list-order");
var updateModal = document.getElementById("updateOrderModal");
var closeBtn = document.getElementsByClassName("close-modal")[0];

async function displayOrder() {
  await axios.get("https://api-zerot.glitch.me/order").then((response) => {
    const listOrders = response.data;

    listOrders.forEach(async (item) => {
      const row = document.createElement("tr");
      const user = await axios
        .get("https://api-zerot.glitch.me/user")
        .then((response) =>
          response.data.find((user) => user.id === item.userid)
        );

      row.innerHTML += `
          <td class="align-middle px-4">
                              <span class="text-secondary text-xs font-weight-bold">${
                                item.id
                              }</span>
                            </td>
                            <td>
                              <!-- <p class="text-xs font-weight-bold mb-0">Manager</p>
                              <p class="text-xs text-secondary mb-0">Organization</p> -->
                              <h6 class="mb-0 text-sm">${user.name}</h6>
                              <p class="text-xs text-secondary mb-0">${
                                user.email
                              }</p>
                            </td>
                            <td class="align-middle text-center text-sm">
                            ${
                              item.status === "Processing"
                                ? `<span class='badge badge-sm bg-gradient-danger'>
                                  ${item.status}
                                </span>`
                                : item.status === "Delivering"
                                ? `<span class='badge badge-sm bg-gradient-warning'>
                                  ${item.status}
                                </span>`
                                : `<span class='badge badge-sm bg-gradient-success'>
                                  ${item.status}
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
                                } text-secondary font-weight-bold text-sm"
                                onclick=showPopupUpdate(${item.id})>
                                Update <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                              </a>
                              |
                              <a
                                style="cursor: pointer;"
                                class="text-secondary font-weight-bold text-sm">
                                More Info <i class="fa fa-arrow-right" aria-hidden="true"></i>
                              </a>
                            </td>
        `;
      orders.appendChild(row);
    });
  });
}
displayOrder();

async function showPopupUpdate(id) {
  updateModal.style.display = "block";
  var inputOrderId = document.getElementById("order-id");
  inputOrderId.value = id;

  await axios.get("https://api-zerot.glitch.me/order").then((response) => {
    const order = response.data.find((item) => item.id === id);

    const select = document.querySelector("#status_list_edit");
    select.value = order.status;
  });
}

const handleUpdateOrder = async () => {
  const id = document.getElementById("order-id").value;
  const updatedStatus = document.getElementById("status_list_edit").value;

  await axios
    .patch(`https://api-zerot.glitch.me/order/${id}`, {
      status: updatedStatus,
    })
    .then((response) => {
      toastr.success("Update successfully", "Success", {
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
      toastr.error("Update error", "Error", {
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
