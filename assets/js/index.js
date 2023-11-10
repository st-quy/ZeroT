var isLogin = JSON.parse(localStorage.getItem('isLogin'));
var role = localStorage.getItem('role');
var profileData = JSON.parse(localStorage.getItem('me'));

const logoutLink = document.getElementById('registerLink');
const loginLink = document.getElementById('loginLink');
const helloElement = document.createElement('span');
const userData = JSON.parse(localStorage.getItem('me'));

if (isLogin) {
  helloElement.textContent = `Xin chào ${userData.name.toUpperCase()} !`;
  loginLink.textContent = '';
  loginLink.parentNode.insertBefore(helloElement, loginLink);
  logoutLink.textContent = 'Đăng xuất';
  logoutLink.href = 'index.html';
} else {
  helloElement.textContent = '';
  loginLink.textContent = 'Đăng nhập';
  loginLink.href = 'sign-in.html';
  logoutLink.textContent = 'Đăng kí';
  logoutLink.href = 'sign-up.html';
}

logoutLink.addEventListener('click', function () {
  localStorage.clear();
});

const menuItems = document.querySelectorAll('.menu .nav-item');

menuItems.forEach((item) => {
  item.addEventListener('click', function () {
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    this.classList.add('active');
  });
});

const items = document.querySelectorAll('.menu .nav-item');
let maxWidth = 0;

items.forEach((item) => {
  const textWidth = item.querySelector('.nav-link').offsetWidth;
  maxWidth = Math.max(maxWidth, textWidth);
});

// Áp dụng chiều rộng lớn nhất cho các phần tử <li>
items.forEach((item) => {
  item.style.width = `${maxWidth}px`;
});
