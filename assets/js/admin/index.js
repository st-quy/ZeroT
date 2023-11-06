var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");

if (role !== "admin" || role !== "seller") {
  location.href = `${location.origin}/index.html`;
}

// if (role !== "admin" || role !== "seller") {
//     location.href = `${location.origin}/index.html`

// }
