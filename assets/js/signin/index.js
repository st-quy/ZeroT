const apiUrl =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? `http://localhost:4000`
    : "https://api-zerot-lowdb.onrender.com";
var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
var remember = JSON.parse(localStorage.getItem("remember"));

if (isLogin === true) {
  if ((role && role === "admin") || role === "seller") {
    location.href = `${location.origin}/admin.html`;
  } else if (userExist.role === "delivery") {
    location.href = `${location.origin}/list-order-admin.html`;
  } else {
    location.href = `${location.origin}/index.html`;
  }
}
if (remember && remember.checked === true) {
  document.getElementById("rememberMe").checked = remember.checked;
  document.querySelector('input[name="email"]').value = remember.email;
  document.querySelector('input[name="password"]').value = remember.password;
}

function toggleOffer() {
  var email = document.querySelector('input[name="email"]').value;
  var password = document.querySelector('input[name="password"]').value;
  var check = document.getElementById("rememberMe").checked;
  if (check && email && password) {
    localStorage.setItem(
      "remember",
      JSON.stringify({ checked: true, email: email, password: password })
    );
  } else {
    localStorage.removeItem("remember");
  }
}

async function handleLogin() {
  var email = document.querySelector('input[name="email"]').value;
  var password = document.querySelector('input[name="password"]').value;
  var check = document.getElementById("rememberMe").checked;
  if (check && email && password) {
    localStorage.setItem(
      "remember",
      JSON.stringify({ checked: true, email: email, password: password })
    );
  }
  await axios.get(`${apiUrl}/users`).then((response) => {
    var userExist = response.data.find((usr) => usr.email === email);
    if (userExist && userExist.password === password) {
      localStorage.setItem("isLogin", true);
      localStorage.setItem("role", userExist.role);
      localStorage.setItem(
        "me",
        JSON.stringify({ ...userExist, password: null })
      );
      if (userExist.status !== "active") {
        var templateParams = {
          email: userExist.email,
          code: (Math.random() * 100000) | 0,
        };
        emailjs
          .send("default_service", "template_5homdb2", templateParams)
          .then(
            async function () {
              await axios
                .patch(`${apiUrl}/users/${userExist.id}`, {
                  code: templateParams.code,
                })
                .then((res) => {
                  setTimeout(() => {
                    if (
                      userExist.role === "admin" ||
                      userExist.role === "seller"
                    ) {
                      location.href = `${location.origin}/admin.html`;
                    } else if (userExist.role === "delivery") {
                      location.href = `${location.origin}/list-order-admin.html`;
                    } else {
                      location.href = `${location.origin}/index.html`;
                    }
                  }, 1000);
                });
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
      } else {
        setTimeout(() => {
          if (userExist.role === "admin" || userExist.role === "seller") {
            location.href = `${location.origin}/admin.html`;
          } else if (userExist.role === "delivery") {
            location.href = `${location.origin}/list-order-admin.html`;
          } else {
            location.href = `${location.origin}/index.html`;
          }
        }, 500);
      }
    } else {
      toastr.warning(
        "Tài khoản hoặc mật khẩu vừa nhập không chính xác. Vui lòng kiểm tra lại ! ",
        "Message",
        {
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
        }
      );
    }
  });
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleLogin();
  }
});
