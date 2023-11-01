const list = [
  {
    totalPrice: 11500,
    orderItems: {
      product: 1,
      name: "product 1",
      price: 11500,
      image: "sample img",
      quantity: 1,
    },
    status: "Processing",
    userid: 3,
    id: 1,
  },
  {
    totalPrice: 12500,
    orderItems: {
      product: 1,
      name: "product 1",
      price: 11500,
      image: "sample img",
      quantity: 1,
    },
    status: "Delivering",
    id: 2,
    userid: 3,
  },
  {
    totalPrice: 16000,
    orderItems: {
      product: 1,
      name: "product 1",
      price: 11500,
      image: "sample img",
      quantity: 1,
    },
    status: "Delivered",
    id: 3,
    userid: 3,
  },
];

const orders = document.querySelector("#list-order");
var modalUpdate = document.getElementById("updateOrderStatus");
var closeBtn = document.getElementsByClassName("close-modal")[0];

list.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML += `
    <td class="align-middle px-4">
                        <span class="text-secondary text-xs font-weight-bold">${
                          item.id
                        }</span>
                      </td>
                      <td>
                        <!-- <p class="text-xs font-weight-bold mb-0">Manager</p>
                        <p class="text-xs text-secondary mb-0">Organization</p> -->
                        <h6 class="mb-0 text-sm">John Michael</h6>
                        <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
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
                          onclick=UpdateOrderStatus(${item.id})>
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

function UpdateOrderStatus(id) {
  modalUpdate.style.display = "block";
  var inputOrderId = document.getElementById("order-id");
  inputOrderId.value = id;

  const order = list.find((item) => item.id === id);
  const select = document.querySelector("#status_list_edit");
  select.value = order.status;
}

closeBtn.onclick = function () {
  modalUpdate.style.display = "none";
};
