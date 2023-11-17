"use strict";
const apiUrl =
  window.location.hostname === "localhost" || "127.0.0.1"
    ? "http://localhost:4000"
    : "https://api-zerot-lowdb.onrender.com";
var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
if (!role || !["admin", "seller"].includes(role)) {
  location.href = `${location.origin}/index.html`;
}
if (role === "customer") {
  location.href = `${location.origin}/unauthorized.html`;
}
if (!role || !["admin", "seller"].includes(role)) {
  location.href = `${location.origin}/index.html`;
}

const tbody = document.querySelector("#data-table tbody");

axios
  .get(`${apiUrl}/users`)
  .then((response) => {
    const data = response.data;
    data
      .filter((acc) => !acc.deletedAt && acc.role !== "admin")
      .map((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${index + 1}</span
                          >
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${item.email}</span
                          >
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${item.name}</span
                          >
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${item.phone}</span
                          >
                        </td>
                        <td class="align-middle text-center text-sm">
                          <span class="badge badge-sm bg-gradient-${item.role}"
                            >${item.role}</span
                          >
                        </td>
                        <td class="align-middle">
                        <a onclick="handleEdit(${item.id})" class="">
                          <i class="fa fa-pencil cursor-pointer" aria-hidden="true" ></i>
                        </a>
                        <a onclick="handleDelete(${item.id})" class="">
                          <i class="fa fa-trash cursor-pointer"></i>
                        </a>
                        </td>
                        `;
        tbody.appendChild(row);
      });
    // new DataTable('#data-table');
    $("#data-table").DataTable({
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
        url: "/cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Vietnamese.json",
      },
    });
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
  });

async function handleEdit(userId) {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}`);
    const userData = response.data;

    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    modalTitle.textContent = `Chỉnh sửa thông tin: ${userData.name.toUpperCase()}`;
    modalBody.innerHTML = `
      <input type="hidden" name="code" />
                      <label>Email</label>
                      <div class="mb-3">
                        <input
                          readonly
                          class="form-control"
                          placeholder="${userData.email}"
                          aria-label="Email"
                          aria-describedby="email-addon"
                        />
                      </div>
      <input type="hidden" name="code" />
                      <label>Name</label>
                      <div class="mb-3">
                        <input
                          readonly
                          class="form-control"
                          placeholder="${userData.name}"
                          aria-label="Name"
                          aria-describedby="name-addon"
                        />
                      </div>
      <input type="hidden" name="code" />
                      <label>Phone Number</label>
                      <div class="mb-3">
                        <input
                          readonly
                          class="form-control"
                          placeholder="${userData.phone}"
                          aria-label="Phone"
                          aria-describedby="phone-addon"
                        />
                      </div>
                      <label>Role</label>
  <select class="form-control" id="selectRole">
    <option selected value="${userData.role}">${userData.role}</option>
    <option value="customer">Customer</option>
    <option value="seller">Seller</option>
    <option value="delivery">Delivery Man</option>
  </select>
    `;
    const roleSelect = document.getElementById("selectRole");
    const saveModal = document.getElementById("btnSave");
    saveModal.addEventListener("click", async function () {
      try {
        const response = await axios.patch(`${apiUrl}/users/${userId}`, {
          role: roleSelect.value,
        });

        const modal = new bootstrap.Modal(document.getElementById("myModal"));
        modal.hide();
        location.reload();
      } catch (error) {
        console.error("Lỗi khi lưu thay đổi role: ", error);
      }
    });
    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    modal.show();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}

async function handleDelete(userId) {
  try {
    const response = await axios.get(`${apiUrl}/users/${userId}`);
    const userData = response.data;

    const modalTitle = document.getElementById("modal-title");
    const modalBody = document.getElementById("modal-body");

    modalTitle.textContent = `Xóa tài khoản ${userData.id}: ${userData.name}`;
    modalBody.innerHTML = `Bạn có chắc rằng bạn muốn xóa tài khoản ${userData.name} này không ?`;
    const roleSelect = document.getElementById("selectRole");
    const saveModal = document.getElementById("btnSave");
    saveModal.addEventListener("click", async function () {
      try {
        const response = await axios.delete(`${apiUrl}/users/${userId}`);

        const modal = new bootstrap.Modal(document.getElementById("myModal"));
        modal.hide();
        location.reload();
      } catch (error) {
        console.error("Lỗi khi lưu thay đổi role: ", error);
      }
    });
    const modal = new bootstrap.Modal(document.getElementById("myModal"));
    modal.show();
  } catch (error) {
    console.error("Lỗi khi lưu thay đổi: ", error);
  }
}

// // Toggle Sidenav
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
