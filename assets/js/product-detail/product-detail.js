const apiUrl =
  window.location.hostname === 'localhost' || '127.0.0.1'
    ? 'http://localhost:4000'
    : 'https://api-zerot-lowdb.onrender.com';

function changeColor(id, color) {
  const span = document.querySelector('.colors span');
  const li = document.getElementById(id);
  var imgElement = document.getElementById('img');
  const hasChooseClass = li.classList.contains('choose');

  const lis = document.querySelectorAll('.colors ul li');
  lis.forEach((item) => {
    if (item === li) {
      item.classList.add('choose');
      imgElement.src = getImgSrc(id);
      span.textContent = `Màu: ${color}`;
    } else {
      item.classList.remove('choose');
    }
  });
}
function getImgSrc(id) {
  switch (id) {
    case 'marker-1':
      return 'https://res.cloudinary.com/dyk82loo2/image/upload/v1700190017/products/xmi63hni9ai4600u80ba.png';
    case 'marker-2':
      return 'https://res.cloudinary.com/dyk82loo2/image/upload/v1700190019/products/o52ugsiz3okxid97pwnx.png';
    case 'marker-3':
      return 'https://res.cloudinary.com/dyk82loo2/image/upload/v1700190023/products/zyfrkullz2chtewrtwkh.png';
    case 'marker-4':
      return 'https://res.cloudinary.com/dyk82loo2/image/upload/v1700190021/products/qts0kzggqyd2anzwq2gj.png';
    default:
      return 'https://res.cloudinary.com/dyk82loo2/image/upload/v1700190017/products/xmi63hni9ai4600u80ba.png';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var titleProduct = document.getElementById('title-product');
  var price = document.getElementById('price');
  var description = document.getElementById('description');
  var imgElement = document.getElementById('img');
  getProductData(localStorage.getItem('idProduct'))
    .then(function (product) {
      console.log(product);
      // Cập nhật các phần tử trên trang với dữ liệu sản phẩm
      titleProduct.innerText = product.name;
      price.innerText = `${product.price.toLocaleString('vi-VN')}VNĐ`;
      description.innerText = product.description;
      imgElement.src = product.image[0].url;
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
});

async function getProductData(productId) {
  try {
    var response = await axios.get(`${apiUrl}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
