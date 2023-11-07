var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");

// Add the code for displaying the modals
var codeModal = document.getElementById("code-modal");
var passwordModal = document.getElementById("password-modal");
var codeInput = document.getElementById("code-input");
var newPasswordInput = document.getElementById("new-password-input");

async function forgotPassword() {
  var email = document.getElementById("email").value;

  if (!email) {
    showMessagePopup("Please enter your email.");
    return;
  }

  if (!validateEmail(email)) {
    showMessagePopup("Only email addresses are allowed.");
    return;
  }

  await axios
    .get("https://api-zerot-lowdb.onrender.com/users")
    .then((response) => {
      var userExist = response.data.find((usr) => usr.email === email);
      if (userExist) {
        var templateParams = {
          email: userExist.email,
          code: (Math.random() * 100000) | 0,
        };
        emailjs
          .send("service_4mv8mgj", "template_69jvbsa", templateParams)
          .then(
            async function () {
              showMessagePopup("Please check your email for the reset code.");

              // Open the code modal and wait for user input
              codeModal.style.display = "block";
              codeInput.focus();

              var submitCode = function () {
                var enteredCode = codeInput.value;
                if (enteredCode && enteredCode === templateParams.code.toString()) {
                  closeCodeModal();

                  // Open the password modal and wait for user input
                  passwordModal.style.display = "block";
                  newPasswordInput.focus();

                  var submitPassword = async function () {
                    var newPassword = newPasswordInput.value;
                    if (newPassword) {
                      // Update password in the database
                      await axios.patch(
                        `https://api-zerot-lowdb.onrender.com/users/${userExist.id}`,
                        { password: newPassword }
                      );
                      showMessagePopup("Password updated successfully.", true);
                      closePasswordModal();
                      setTimeout(function () {
                        window.location.href = "sign-in.html";
                      }, 2000);
                    } else {
                      showMessagePopup("Invalid password. Password update failed.");
                    }
                  };

                  document
                    .getElementById("password-modal-submit")
                    .addEventListener("click", submitPassword);
                } else {
                  showMessagePopup("Invalid code. Password reset failed.");
                }
              };

              document.getElementById("code-modal-submit").addEventListener("click", submitCode);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
      } else {
        showMessagePopup("Email does not exist.");
      }
    });
}


function validateEmail(email) {
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showMessagePopup(message, isSuccess = false) {
  var popup = document.getElementById("popup");
  var popupContent = document.getElementById("popup-content");

  popupContent.textContent = message;

  if (isSuccess) {
    popup.classList.add("success");
  } else {
    popup.classList.remove("success");
  }

  popup.style.display = "block";
  setTimeout(function () {
    popup.style.display = "none";
  }, 2000);
}

var closeCodeModal = function () {
  codeModal.style.display = "none";
};

var closePasswordModal = function () {
  passwordModal.style.display = "none";
};