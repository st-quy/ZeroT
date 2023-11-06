
// async function confirmEmail(){
//   var enteredEmail = document.getElementById("minh-confirm-email").value;
//   const profile = JSON.parse(localStorage.getItem("me")); 
//   await axios
//     .get("https://api-zerot-lowdb.onrender.com/users")
//     .then(async (response) => {
//       var userExist = response.data.find((usr) => usr.email === email);
//       if (String(enteredEmail) === userExist.email) {
        
//             var templateParams = {
//                 email: userExist.email,
//                 code: (Math.random() * 100000) | 0,
//             };
//             emailjs
//             .send("service_4mv8mgj", "template_69jvbsa", templateParams)
//             .then(
//               async function () {
//                 await axios
//                   .patch(
//                     `https://api-zerot-lowdb.onrender.com/users/${userExist.id}`,
//                     {
//                       code: templateParams.code,
//                     }
//                   )
//                 });
            
//         }
    
//     });
// }

var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
async function confirmEmail() {
  var enteredEmail = document.getElementById("minh-confirmEmail").value;
  const profile = JSON.parse(localStorage.getItem("me"));
  
  await axios.get("https://api-zerot-lowdb.onrender.com/users").then(async (response) => {
    var userExist = response.data.find((usr) => usr.email === profile.email); // Use enteredEmail instead of email
    
    if (email(enteredEmail) === userExist.email) { // Make sure the user exists
      var templateParams = {
        email: userExist.email,
        code: (Math.random() * 100000) | 0,
      };

      emailjs.send("service_4mv8mgj", "template_69jvbsa", templateParams).then(async function () {
        await axios.patch(
          `https://api-zerot-lowdb.onrender.com/users/${userExist.id}`,
          {
            code: templateParams.code,
          }
        );
        alert("Confirmation code sent to your email.");
      });
    } else {
      alert("User not found with the provided email.");
    }
  });
}