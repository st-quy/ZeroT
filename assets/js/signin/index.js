async function handleLogin() {

//   var templateParams = {
//     email: 'quy.pham@stunited.vn',
//     code: (Math.random() * 100000) | 0
// };
//     emailjs.send("service_4mv8mgj", "template_69jvbsa", templateParams ).then(
//       function () {
//         console.log("SUCCESS!");
//       },
//       function (error) {
//         console.log("FAILED...", error);
//       }
//     );
  var email = document.querySelector('input[name="email"]').value;
  var password = document.querySelector('input[name="password"]').value;
  await axios.get("https://api-zerot.glitch.me/user").then((response) => {
    var userExist = response.data.find((usr) => usr.email === email);
    if (userExist && userExist.password === password) {
      localStorage.setItem("isLogin", true);
      localStorage.setItem("role", userExist.role);
      setTimeout(() => {
        if (userExist.role === "admin" || userExist.role === "seller") {
        location.href = `${location.origin}/admin.html`;
        } else {
        location.href = `${location.origin}/index.html`;
        }
      }, 1000);
    }
  });
}

