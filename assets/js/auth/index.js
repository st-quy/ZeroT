async function handleSignout() {
  localStorage.removeItem("me");
  localStorage.removeItem("role");
  localStorage.removeItem("isLogin");
  setTimeout(function () {
    location.href = `${location.origin}/index.html`;
  }, 500);
}

const profile = JSON.parse(localStorage.getItem("me"));
// if (profile && profile.status !== 'active') {
//   alert("show modal confirm email")
// }

var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");
const rolelist = ["admin", "seller", "delivery"];

if (!role || !rolelist.includes(role)) {
  location.href = `${location.origin}/index.html`;
}

if (!isLogin || !role || !["admin", "seller", "delivery"].includes(role)) {
  location.href = `${location.origin}/unauthorized.html`;
}
// if (role === "customer") {
//   location.href = `${location.origin}/unauthorized.html`;
// }
