var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
var profileData = JSON.parse(localStorage.getItem("me"));
var minhModal = document.getElementById("minh-modal");

if (profileData && profileData.status === "inactive") {
  minhModal.style.display = "block";
} else {
  minhModal.style.display = "none";
}

async function closeConfirmModal() {
  minhModal.style.display = "none";
}

async function confirmCode() {
  var enteredCode = document.getElementById("confirmationCode").value;
  const profile = JSON.parse(localStorage.getItem("me"));
  await axios
    .get("https://api-zerot-lowdb.onrender.com/users")
    .then(async (response) => {
      var userExist = response.data.find((usr) => usr.email === profile.email);
      if (Number(enteredCode) === userExist.code) {
        await axios
          .patch(`https://api-zerot-lowdb.onrender.com/users/${userExist.id}`, {
            status: "active",
            code: null,
          })
          .then((response) => {
            localStorage.setItem(
              "me",
              JSON.stringify({ ...response.data, password: null })
            );
            toastr.success(
              "Tài khoản đã được kích hoạt",
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
            minhModal.style.display = "none";
            
          });
      } else {
        toastr.warning(
          "Vui lòng nhập đúng code trong Email",
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