var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
var profileData = JSON.parse(localStorage.getItem("me"));
var minhModal = document.getElementById("minh-modal");
var btnCancel = document.getElementById("btnCancel");
var messagePopup = document.getElementById("messagePopup");

minhModal.style.display = "none";
if (profileData && profileData.status === "inactive") {
  minhModal.style.display = "block";
}
btnCancel.onclick = function () {
  minhModal.style.display = "none";
};

async function confirmCode() {
  var enteredCode = document.getElementById("confirmationCode").value;
  const profile = JSON.parse(localStorage.getItem("me"));

  if (enteredCode.length !== 5) {
    showMessage("Please enter a 5-digit code.");
    return;
  }
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
            showBigMessage("Account Activated");
          });
      } else {
        showMessage("Invalid confirmation code. Please try again.");
      }
    });
}

function showMessage(text) {
  messagePopup.innerHTML = text;
  messagePopup.classList.remove("big-message");
  messagePopup.style.opacity = 1;
  messagePopup.style.transform = "translate(-50%, -50%) scale(1)";
  setTimeout(function () {
    messagePopup.style.opacity = 0;
    messagePopup.style.transform = "translate(-50%, -50%) scale(0)";
  }, 2000);
}

function showBigMessage(text) {
  messagePopup.innerHTML = text;
  messagePopup.classList.add("big-message");
  messagePopup.style.opacity = 1;
  messagePopup.style.transform = "translate(-50%, -50%) scale(1)";
  setTimeout(function () {
    messagePopup.style.opacity = 0;
    messagePopup.style.transform = "translate(-50%, -50%) scale(0)";
    messagePopup.classList.remove("big-message");
  }, 2000);
}