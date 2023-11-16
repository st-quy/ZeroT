function changeColor(id, color) {
  const span = document.querySelector('.colors span');
  const li = document.getElementById(id);
  const hasChooseClass = li.classList.contains('choose');

  const lis = document.querySelectorAll('.colors ul li');
  lis.forEach((item) => {
    if (hasChooseClass) {
      span.textContent = `Màu: ${color}`;
    } else {
      item.classList.remove('choose');
    }
  });

  li.classList.add('choose');
  span.textContent = `Màu: ${color}`;
}
