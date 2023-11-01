var isLogin = JSON.parse(localStorage.getItem("isLogin"));
var role = localStorage.getItem("role");

  if (role !== undefined && role === "admin" || role === "seller") {
    location.href = `${location.origin}/admin.html`
  }
