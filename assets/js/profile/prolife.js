const apiUrl =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:4000"
    : "https://api-zerot-lowdb.onrender.com";
var profileData = JSON.parse(localStorage.getItem("me"));
var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
var me = JSON.parse(localStorage.getItem("me"));

axios.get(`${apiUrl}/users/${profileData.id}`).then((response) => {
  document.getElementById("count-badge").textContent = response.data
    ? response.data.cartItems.length
    : 0;
});
axios.get(`${apiUrl}/orders`).then((response) => {
  const orders = response.data.filter(
    (order) => Number(order.user[0]) === Number(profileData.id)
  );
  document.getElementById("orderDetails-count").textContent = orders.length;
});
function displayInfo() {
  const tbody = document.getElementById("table-body");
  tbody.innerHTML = "";
  const row = document.createElement("tr");
  me = JSON.parse(localStorage.getItem("me"));

  row.innerHTML = `
                      <td class="table-profile">
                        <span>Tên người dùng: ${me.name}</span>
                        <br>
                            <span>Email người dùng: ${me.email}</span>
                            <br>
                            <span >Số điện thoại người dùng: ${me.phone}</span>
                            <br>
                            ${
                              me.address
                                ? `<span>Địa chỉ người dùng: ${
                                    me.address ? me.address : ""
                                  }</span> 
                            `
                                : ""
                            }
                                                                                                
                      </td>`;
  tbody.appendChild(row);
}
displayInfo();
var modal = document.getElementById("changePassModal");
var newPassModal = document.getElementById("newPassModal");

var confirmOldPassInput = document.getElementById("confirmOldPassInput");
var newPassInput = document.getElementById("newPassInput");
var confirmNewPassInput = document.getElementById("confirmNewPassInput");

var infoModal = document.getElementById("infoModal");
var infoName = document.getElementById("info-name");
var infoEmail = document.getElementById("info-email");
var infoPhone = document.getElementById("info-phone");
var infoAddress = document.getElementById("info-address");

modal.style.display = "none";
newPassModal.style.display = "none";
infoModal.style.display = "none";

function openModal() {
  modal.style.display = "block";
  confirmOldPassInput.value = "";
  newPassInput.value = "";
  confirmNewPassInput.value = "";
}

// Đóng modal
function closeModal() {
  modal.style.display = "none";
  newPassModal.style.display = "none";
  infoModal.style.display = "none";
}

async function confirmOldPass() {
  await axios.get(`${apiUrl}/users/${me.id}`).then((res) => {
    if (confirmOldPassInput.value === res.data.password) {
      confirmOldPassInput.value = "";
      confirmOldPassInput.focus();
      confirmOldPassInput.placeholder = "Nhập mật khẩu mới";
      toastr.info("Nhập mật khẩu mới", "Thông báo", {
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

      modal.style.display = "none";
      newPassModal.style.display = "block";
    } else {
      toastr.error("Nhập mật khẩu sai", "Lỗi", {
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
      confirmOldPassInput.value = "";
      confirmOldPassInput.focus();
    }
  });
}

async function confirmNewPass() {
  if (newPassInput.value === confirmNewPassInput.value) {
    try {
      await axios.patch(`${apiUrl}/users/${me.id}`, {
        password: newPassInput.value,
      });
      toastr.success("Đổi mật khẩu thành công", "Thành công", {
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
      newPassModal.style.display = "none";
    } catch (error) {
      toastr.error("Đổi mật khẩu không thành công", "Lỗi", {
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
  } else {
    toastr.error("Mật khẩu không trùng khớp", "Lỗi", {
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
    newPassInput.value = "";
    confirmNewPassInput.value = "";
  }
}

function openModalInfo() {
  infoModal.style.display = "block";
  me = JSON.parse(localStorage.getItem("me"));
  infoName.value = me.name;
  infoEmail.value = me.email;
  infoPhone.value = me.phone;
  infoAddress.value = me.address ? me.address : "";
}

async function changeInfo() {
  var name = infoName.value;
  var email = infoEmail.value;
  var phone = infoPhone.value;
  var address = infoAddress.value;

  if (email && email !== me.email) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!email.match(validRegex)) {
      toastr.warning("Email không hợp lệ", "Lỗi", {
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
      return;
    }
    var userExist;
    await axios.get(`${apiUrl}/users`).then((response) => {
      userExist = response.data.find((u) => u.email === email);
      return userExist;
    });

    if (userExist) {
      toastr.warning("Email đã tồn tại", "Lỗi", {
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
      return;
    }
  }

  if (phone && phone !== me.phone) {
    var validRegex = /^0\d{9}$/;

    if (!phone.match(validRegex)) {
      toastr.warning("Số điện thoại không hợp lệ", "Lỗi", {
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
      return;
    }
  }

  if (name && email && phone) {
    try {
      await axios.patch(`${apiUrl}/users/${me.id}`, {
        name,
        email,
        phone,
        address,
      });

      localStorage.setItem(
        "me",
        JSON.stringify({ ...me, password: null, name, email, phone, address })
      );
      infoModal.style.display = "none";
      toastr.success("Chỉnh sửa thông tin thành công", "Thành công", {
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
      displayInfo();
      helloElement.textContent = `Xin chào ${me.name.toUpperCase()} !`;
    } catch (error) {
      throw error
    }
  }
}
