var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
if (isLogin === true) {
  if ((role && role === "admin") || role === "seller") {
    location.href = `${location.origin}/admin.html`;
  } else {
    location.href = `${location.origin}/index.html`;
  }
}

var form = document.querySelector("form");

form.addEventListener("submit", async function (event) {
  // Ngăn chặn hành vi mặc định của form (không gửi dữ liệu)
  event.preventDefault();
  var nameInput = document.querySelector('input[placeholder="Name"]');
  var emailInput = document.querySelector('input[placeholder="Email"]');
  var passwordInput = document.querySelector('input[placeholder="Password"]');
  var phoneInput = document.querySelector('input[placeholder="Phone"]');
  var roleInput = document.querySelector('select[placeholder="Role"]');

  var name = nameInput.value;
  var email = emailInput.value;
  var password = passwordInput.value;
  var phone = phoneInput.value;
  var role = roleInput.value;

  await axios
    .post("https://api-zerot.onrender.com/user", {
      name,
      email,
      password,
      phone,
      role,
      status: "inactive",
    })
    .then((response) => {
      toastr.success("Signup successfully", "Message", {
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
        location.href = `${location.origin}/sign-in.html`;
      }, 1000);
      form.reset();
    });
});
