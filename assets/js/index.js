var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");

if (role !== undefined && role === "admin" || role === "seller") {
    location.href = `${location.origin}/admin.html`
}
const profile = JSON.parse(localStorage.getItem('me'))
if (profile && profile.status !== 'active') {
  alert("show modal confirm email")
}