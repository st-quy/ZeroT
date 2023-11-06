const tbody = document.querySelector('#table-product tbody');
axios.get('https://api-zerot-lowdb.onrender.com/products')

.then(function(response) {
        const data = response.data;
        console.log(data);
        data.forEach(function(product) {
            if (product.deletedAt === false || product.deletedAt === undefined) {
                const row = document.createElement('tr');
                row.innerHTML = `
                  <td class="align-middle text-center data-id='${product.id}'">
                    <span class="text-secondary text-xs font-weight-bold">${product.id}</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${product.name}</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${product.price}</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${product.description}</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${product.image}</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${product.category}</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${product.stock}</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${product.review}</span>
                  </td>
                  <td class="align-middle text-center">
                    <i class="fa fa-pencil cursor-pointer btn-sm" onclick=handleEdit(${product.id})></i>
                    <span>&nbsp;</span>
                    <i class="fa fa-trash cursor-pointer btn-sm" onclick=handleDelete(${product.id})></i>
                  </td>`;
                tbody.appendChild(row);
            }
        });
    })
    .catch(function(error) {
        console.error('Error fetching data: ', error);
    });

async function handleEdit(id) {
    try {
        const response = await axios.get(
            `https://api-zerot-lowdb.onrender.com/products/${id}`
        );
        const product = response.data;

        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = `Chỉnh sửa thông tin sản phẩm: ${product.name}`;
        modalBody.innerHTML = `
          <input type="hidden" name="code" />
          <label>ID</label>
          <div class="mb-3">
              <input
                  readonly
                  class="form-control"
                  placeholder="${product.id}"                      
              />
          </div>
          <label>Name</label>
          <div class="mb-3">
              <input type="text" id="nameInput" placeholder="${product.name}" value="${product.name}" />
          </div>
          <label>Price</label>
          <div class="mb-3">
              <input type="text" id="priceInput" placeholder="${product.price}" value="${product.price}" />
          </div>
          <label>STOCK</label>
          <div class="mb-3">
              <input type="text" id="stockInput" placeholder="${product.stock}" value="${product.stock}" />
          </div>
          <label>Category</label>
          <div class="mb-3">
              <input type="text" id="categoryInput" placeholder="${product.category}" value="${product.category}" />
          </div>
      `;

        const modal = new bootstrap.Modal(document.getElementById('myModal'));
        modal.show();

        const saveModal = document.getElementById('btnSave');
        saveModal.addEventListener('click', async function() {
            try {
                const nameInput = document.getElementById('nameInput');
                const priceInput = document.getElementById('priceInput');
                const stockInput = document.getElementById('stockInput');
                const categoryInput = document.getElementById('categoryInput');

                const response = await axios.patch(
                    `https://api-zerot-lowdb.onrender.com/products/${id}`, {
                        name: nameInput.value,
                        price: priceInput.value,
                        stock: stockInput.value,
                        category: categoryInput.value
                    }
                );

                const modal = new bootstrap.Modal(document.getElementById('myModal'));
                modal.hide();
                location.reload();
            } catch (error) {
                console.error('Lỗi khi lưu thay đổi: ', error);
            }
        });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm: ', error);
    }
}

async function handleDelete(id) {
    try {
        const response = await axios.get(
            `https://api-zerot-lowdb.onrender.com/products/${id}`
        );
        const product = response.data;

        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = `Xóa sản phẩm: ${product.name}`;
        modalBody.innerHTML = `Bạn có chắc chắn rằng bạn muốn xóa sản phẩm ${product.name} không ?`;

        const saveModal = document.getElementById('btnSave');
        saveModal.addEventListener('click', async function() {
            try {
                const deleteResponse = await axios.patch(
                    `https://api-zerot-lowdb.onrender.com/products/${id}`, {
                        deletedAt: true,
                    }
                );
                const modal = new bootstrap.Modal(document.getElementById('myModal'));
                modal.hide();
                location.reload();
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm: ', error);
            }
        });

        const modal = new bootstrap.Modal(document.getElementById('myModal'));
        modal.show();
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sản phẩm: ', error);
    }
}


// const createProductButton = document.getElementById('btnCreateProduct');
// createProductButton.addEventListener('click', () => {
//     createProduct();
// });

// async function createProduct() {

// }