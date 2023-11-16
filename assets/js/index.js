var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
var profileData = JSON.parse(localStorage.getItem("me"));

const logoutLink = document.getElementById("registerLink");
const loginLink = document.getElementById("loginLink");
const helloElement = document.createElement("span");
const userData = JSON.parse(localStorage.getItem("me"));

if (isLogin) {
  helloElement.textContent = `Xin chào ${userData.name.toUpperCase()} !`;
<<<<<<< HEAD
  loginLink.textContent = "";
  loginLink.parentNode.insertBefore(helloElement, loginLink);
  logoutLink.textContent = "Đăng xuất";
  logoutLink.href = "index.html";
} else {
  helloElement.textContent = "";
  loginLink.textContent = "Đăng nhập";
  loginLink.href = "sign-in.html";
  logoutLink.textContent = "Đăng kí";
  logoutLink.href = "sign-up.html";
}

logoutLink.addEventListener("click", function () {
=======
  loginLink.textContent = '';
  loginLink.parentNode.insertBefore(helloElement, loginLink);
  logoutLink.textContent = 'Đăng xuất';
  logoutLink.href = 'index.html';
} else {
  helloElement.textContent = '';
  loginLink.textContent = 'Đăng nhập';
  loginLink.href = 'sign-in.html';
  logoutLink.textContent = 'Đăng kí';
  logoutLink.href = 'sign-up.html';
}

logoutLink.addEventListener('click', function () {
>>>>>>> develop
  localStorage.clear();
});

const menuItems = document.querySelectorAll(".menu .nav-item");

menuItems.forEach((item) => {
<<<<<<< HEAD
  item.addEventListener("click", function () {
    menuItems.forEach((item) => {
      item.classList.remove("active");
    });
    this.classList.add("active");
=======
  item.addEventListener('click', function () {
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    this.classList.add('active');
>>>>>>> develop
  });
});

const items = document.querySelectorAll(".menu .nav-item");
let maxWidth = 0;

items.forEach((item) => {
<<<<<<< HEAD
  const textWidth = item.querySelector(".nav-link").offsetWidth;
=======
  const textWidth = item.querySelector('.nav-link').offsetWidth;
>>>>>>> develop
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
<<<<<<< HEAD
  var enteredCode = document.getElementById("confirmationCode").value;
  const profile = JSON.parse(localStorage.getItem("me"));
  await axios.get("http://localhost:4000/users").then(async (response) => {
    var userExist = response.data.find((usr) => usr.email === profile.email);
    if (Number(enteredCode) === userExist.code) {
      await axios
        .patch(`http://localhost:4000/users/${userExist.id}`, {
          status: "active",
          code: null,
        })
        .then((response) => {
          localStorage.setItem(
            "me",
            JSON.stringify({ ...response.data, password: null })
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
=======
  var enteredCode = document.getElementById('confirmationCode').value;
  const profile = JSON.parse(localStorage.getItem('me'));
  await axios
    .get('https://api-zerot-lowdb.onrender.com/users')
    .then(async (response) => {
      var userExist = response.data.find((usr) => usr.email === profile.email);
      if (Number(enteredCode) === userExist.code) {
        await axios
          .patch(`https://api-zerot-lowdb.onrender.com/users/${userExist.id}`, {
            status: 'active',
            code: null,
          })
          .then((response) => {
            localStorage.setItem(
              'me',
              JSON.stringify({ ...response.data, password: null })
            );
            toastr.success('Tài khoản đã được kích hoạt', 'Message', {
              timeOut: 2000,
              closeButton: true,
              debug: false,
              newestOnTop: true,
              progressBar: true,
              positionClass: 'toast-top-right',
              preventDuplicates: true,
              onclick: null,
              showDuration: '300',
              hideDuration: '1000',
              extendedTimeOut: '1000',
              showEasing: 'swing',
              hideEasing: 'linear',
              showMethod: 'fadeIn',
              hideMethod: 'fadeOut',
              tapToDismiss: false,
            });
            minhModal.style.display = 'none';
          });
      } else {
        toastr.warning('Vui lòng nhập đúng code trong Email', 'Message', {
          timeOut: 2000,
          closeButton: true,
          debug: false,
          newestOnTop: true,
          progressBar: true,
          positionClass: 'toast-top-right',
          preventDuplicates: true,
          onclick: null,
          showDuration: '300',
          hideDuration: '1000',
          extendedTimeOut: '1000',
          showEasing: 'swing',
          hideEasing: 'linear',
          showMethod: 'fadeIn',
          hideMethod: 'fadeOut',
          tapToDismiss: false,
        });
      }
    });
>>>>>>> develop
}
