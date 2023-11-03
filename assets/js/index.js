var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
var profileData = JSON.parse(localStorage.getItem("me"));

var modal = document.getElementById("modal");
var btnCancel = document.getElementById("btnCancel");
modal.style.display = "none";
if (profileData && profileData.status === "inactive") {
  modal.style.display = "block";
}

btnCancel.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

async function confirmCode() {
  var enteredCode = document.getElementById("confirmationCode").value;
  const profile = JSON.parse(localStorage.getItem("me"));

  await axios
    .get("https://api-zerot.onrender.com/user")
    .then(async (response) => {
      var userExist = response.data.find((usr) => usr.email === profile.email);
      if (Number(enteredCode) === userExist.code) {
        // Code is valid, show index.html or redirect to index.html
        await axios
          .patch(`https://api-zerot.onrender.com/user/${userExist.id}`, {
            status: "active",
            code: null,
          })
          .then((response) => {
            localStorage.setItem(
              "me",
              JSON.stringify({ ...response.data, password: null })
            );
            modal.style.display = "none";
          });
      } else {
        // Code is invalid, show an error message or handle accordingly
        alert("Invalid confirmation code. Please try again.");
      }
    });
}
