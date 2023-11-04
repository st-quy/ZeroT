var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");

async function confirmEmail(){
    var email = document.querySelector('input[name="email"]').value;
    await axios
    .get("https://api-zerot-lowdb.onrender.com/users")
    .then((response) => {
        var userExist = response.data.find((usr) => usr.email === email);
        if (userExist && userExist.email === email) {
            var templateParams = {
                email: userExist.email,
                code: (Math.random() * 100000) | 0,
            };
            emailjs
            .send("service_4mv8mgj", "template_69jvbsa", templateParams)
            .then(
              async function () {
                await axios
                  .patch(
                    `https://api-zerot-lowdb.onrender.com/users/${userExist.id}`,
                    {
                      code: templateParams.code,
                    }
                  )
                });
            
        }
    
    });
}