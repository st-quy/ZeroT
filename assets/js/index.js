var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
var profileData = JSON.parse(localStorage.getItem("me"));
const logoutLink = document.getElementById("registerLink");
const loginLink = document.getElementById("loginLink");
const helloElement = document.createElement("span");
const num = document.getElementById("cart-items-number");
const cometoAdmin = document.getElementById("cometoAdmin");
const addToCartAction = document.getElementById("add-to-cart-action");
const apiUrl =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? `http://localhost:4000`
    : "https://api-zerot-lowdb.onrender.com";

const dropdownContent = document.querySelector(
  ".dropdown-content li:first-child"
);
const profileElement = document.createElement("li");
const profileLink = document.createElement("a");
const line = document.createElement("hr");

const userData = JSON.parse(localStorage.getItem("me"));

if (isLogin) {
  if (role == "admin") {
    loginLink.innerHTML = "Trang Admin";
    loginLink.href = "admin.html";
    logoutLink.textContent = "Đăng xuất";
    logoutLink.href = "index.html";
  }
  if (role == "delivery") {
    loginLink.innerHTML = "Trang Order";
    loginLink.href = "list-order-admin.html";
    logoutLink.textContent = "Đăng xuất";
    logoutLink.href = "index.html";
  }
  if (role == "customer") {
    helloElement.textContent = `Xin chào ${userData.name.toUpperCase()} !`;
    loginLink.textContent = "";
    loginLink.parentNode.insertBefore(helloElement, loginLink);
    logoutLink.textContent = "Đăng xuất";
    logoutLink.href = "index.html";
  }
  if (role == "seller") {
    loginLink.innerHTML = "Trang Seller";
    loginLink.href = "admin.html";
    logoutLink.textContent = "Đăng xuất";
    logoutLink.href = "index.html";
  }

  // const apiUrl =
  //   window.location.hostname === "localhost" || "127.0.0.1"
  //     ? "http://localhost:4000"
  //     : "https://api-zerot-lowdb.onrender.com";
  axios.get(`${apiUrl}/users/${userData.id}`).then((res) => {
    num.textContent = res.data
      ? res.data.cartItems.length
      : 0;
  });

  profileElement.appendChild(profileLink);
  profileLink.textContent = `Hồ Sơ`;
  profileLink.href = "profile.html";
  dropdownContent.after(profileElement);
  dropdownContent.after(line);
} else {
  helloElement.textContent = "";
  loginLink.textContent = "Đăng nhập";
  loginLink.href = "sign-in.html";
  logoutLink.textContent = "Đăng kí";
  logoutLink.href = "sign-up.html";
}

logoutLink.addEventListener("click", function () {
  localStorage.clear();
});

const menuItems = document.querySelectorAll(".menu .nav-item");

menuItems.forEach((item) => {
  item.addEventListener("click", function () {
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
  });
});

const items = document.querySelectorAll(".menu .nav-item");
let maxWidth = 0;

items.forEach((item) => {
  const textWidth = item.querySelector(".nav-link").offsetWidth;
  maxWidth = Math.max(maxWidth, textWidth);
});

// Áp dụng chiều rộng lớn nhất cho các phần tử <li>
items.forEach((item) => {
  item.style.width = `${maxWidth}px`;
});

var minhModal = document.getElementById("minh-modal");

if (profileData && profileData.status === 'inactive') {
  minhModal.style.display = 'block';
}

function closeConfirmModal() {
  var minhModal = document.getElementById('minh-modal');
  minhModal.style.display = 'none';
}

async function confirmCode() {
  var enteredCode = document.getElementById("confirmationCode").value;
  const profile = JSON.parse(localStorage.getItem("me"));
  await axios.get(`${apiUrl}/users`).then(async (response) => {
    var userExist = response.data.find((usr) => usr.email === profile.email);
    if (Number(enteredCode) === userExist.code) {
      await axios
        .patch(`${apiUrl}/users/${userExist.id}`, {
          status: "active",
          code: null,
        })
        .then((response) => {
          localStorage.setItem(
            "me",
            JSON.stringify({ ...profile, password: null, status: "active" })
          );
          toastr.success("Tài khoản đã được kích hoạt", "Message", {
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
          minhModal.style.display = "none";
        });
    } else {
      toastr.warning("Vui lòng nhập đúng code trong Email", "Message", {
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
  });
}
