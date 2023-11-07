var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
var profileData = JSON.parse(localStorage.getItem("me"));

var minhModal = document.getElementById("minh-modal");
var btnCancel = document.getElementById("btnCancel");
minhModal.style.display = "none";
if (profileData && profileData.status === "inactive") {
  minhModal.style.display = "block";
}

btnCancel.onclick = function () {
  minhModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == minh-modal) {
    minhModal.style.display = "none";
  }
};

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
            minhModal.style.display = "none";
          });
      } else {
        alert("Invalid confirmation code. Please try again.");
      }
    });
}


btnCancel.onclick = function () {
  minhModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == minh-modal) {
    minhModal.style.display = "none";
  }
};

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
            minhModal.style.display = "none";
          });
      } else {
        alert("Invalid confirmation code. Please try again.");
      }
    });
}


