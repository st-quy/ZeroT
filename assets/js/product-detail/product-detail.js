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
