var isLogin = JSON.parse(localStorage.getItem('isLogin'));
var role = localStorage.getItem('role');
if (isLogin === true) {
  if ((role && role === 'admin') || role === 'seller') {
    location.href = `${location.origin}/admin.html`;
  } else {
    location.href = `${location.origin}/index.html`;
  }
}

async function handleLogin() {
  var email = document.querySelector('input[name="email"]').value;
  var password = document.querySelector('input[name="password"]').value;
  await axios
    .get('https://api-zerot-lowdb.onrender.com/users')
    .then((response) => {
      var userExist = response.data.find((usr) => usr.email === email);
      if (userExist && userExist.password === password) {
        localStorage.setItem('isLogin', true);
        localStorage.setItem('role', userExist.role);
        localStorage.setItem(
          'me',
          JSON.stringify({ ...userExist, password: null })
        );
        if (userExist.status !== 'active') {
          var templateParams = {
            email: userExist.email,
            code: (Math.random() * 100000) | 0,
          };
          emailjs
            .send('service_4mv8mgj', 'template_69jvbsa', templateParams)
            .then(
              async function () {
                await axios
                  .patch(
                    `https://api-zerot-lowdb.onrender.com/users/${userExist.id}`,
                    {
                      code: templateParams.code,
                    }
                  )
                  .then((res) => {
                    setTimeout(() => {
                      if (
                        userExist.role === 'admin' ||
                        userExist.role === 'seller'
                      ) {
                        location.href = `${location.origin}/admin.html`;
                      } else {
                        location.href = `${location.origin}/index.html`;
                      }
                    }, 1000);
                  });
              },
              function (error) {
                console.log('FAILED...', error);
              }
            );
        } else {
          setTimeout(() => {
            if (userExist.role === 'admin' || userExist.role === 'seller') {
              location.href = `${location.origin}/admin.html`;
            } else {
              location.href = `${location.origin}/index.html`;
            }
          }, 1000);
        }
      }
    });
}
