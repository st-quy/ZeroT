const apiUrl =
  window.location.hostname === "localhost" || "127.0.0.1"
    ? "http://localhost:4000"
    : "https://api-zerot-lowdb.onrender.com";
var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");

var forgotPasswordButton = document.getElementById("forgotPasswordButton");
var forgotMinh = document.getElementById("forgot-minh");
var codeModal = document.getElementById("code-modal");
var passwordModal = document.getElementById("password-modal");
var codeInput = document.getElementById("code-input");
var newPasswordInput = document.getElementById("new-password-input");

forgotPasswordButton.addEventListener("click", function () {
  if (forgotMinh.style.display === "none") {
    forgotMinh.style.display = "block";
  } else {
    forgotMinh.style.display = "none";
  }
});

function closeForgotModal() {
  var forgotModal = document.getElementById("forgot-minh");
  forgotModal.style.display = "none";
}

function closeCodeModal() {
  var codeModal = document.getElementById("code-modal");
  codeModal.style.display = "none";
}

var closePasswordModal = function () {
  var passwordModal = document.getElementById("password-modal");
  passwordModal.style.display = "none";
};

async function forgotPassword() {
  var email = document.getElementById("email").value;

  if (!email) {
    toastr.warning("Email không chính xác vui lòng nhập lại", "Message", {
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

  if (!validateEmail(email)) {
    toastr.warning("Email không chính xác vui lòng nhập lại", "Message", {
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

  await axios.get(`${apiUrl}/users`).then((response) => {
    var userExist = response.data.find((usr) => usr.email === email);
    if (userExist) {
      var templateParams = {
        email: userExist.email,
        code: (Math.random() * 100000) | 0,
      };
      emailjs.send("default_service", "template_5homdb2", templateParams).then(
        async function () {
          toastr.success("Đã gửi code về Email của bạn", "Message", {
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
          codeModal.style.display = "block";
          codeInput.focus();

          var submitCode = function () {
            var enteredCode = codeInput.value;
            if (enteredCode && enteredCode === templateParams.code.toString()) {
              toastr.success(
                "Nhập code thành công vui long điền mật khẩu mới",
                "Message",
                true,
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
              closeCodeModal();

              // Open the password modal and wait for user input
              passwordModal.style.display = "block";
              newPasswordInput.focus();

              var submitPassword = async function () {
                var newPassword = newPasswordInput.value;
                if (newPassword) {
                  // Update password in the database
                  await axios.patch(`${apiUrl}/users/${userExist.id}`, {
                    password: newPassword,
                  });
                  toastr.success("Đổi mật khẩu thành công", "Message", true, {
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

                  closePasswordModal();
                  setTimeout(function () {
                    window.location.href = "sign-in.html";
                  }, 1000);
                } else {
                  toastr.warning("Mật khẩu sai vui lòng nhập lại", "Message", {
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
              };

              document
                .getElementById("password-modal-submit")
                .addEventListener("click", submitPassword);
            } else {
              toastr.warning("Code sai vui lòng nhập lại", "Message", {
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
          };

          document
            .getElementById("code-modal-submit")
            .addEventListener("click", submitCode);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    } else {
      toastr.warning("Email không tồn tại", "Message", {
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
function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
