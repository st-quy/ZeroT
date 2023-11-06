const tbody = document.querySelector('#table-product tbody');
axios.get('https://api-zerot-lowdb.onrender.com/products')

.then(function(response) {
        const data = response.data;
        console.log(data);
        data.forEach(function(product) {
            const row = document.createElement('tr');
            row.innerHTML = `<td class="align-middle text-center data-id='${product.id}'">
                          <span class="text-secondary text-xs font-weight-bold">
                            ${product.id}
                            </span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold">
                            ${product.name}</span>
                          
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${product.price}</span>
                          
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                            >${product.description}</span>
                          
                        </td>
                        <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold"
                          >${product.image}</span>
                        
                      </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                          >${product.category}</span>
                        </td>
                        <td class="align-middle text-center">
                          <span class="text-secondary text-xs font-weight-bold"
                          >${product.stock}</span>
                        </td>
                        
                      <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold"
                        >${product.review}</span>
                      </td>
                      <td class="align-middle text-center">
                      <i class="  fa fa-pencil cursor-pointer" onclick=handleEdit(${product.id}) btn-sm"></i>
                      <span>&nbsp;</span>
                      <i class="   fa fa-trash cursor-pointer" onclick=handleDelete(${product.id}) btn-sm"></i>
                        </td>`;
            tbody.appendChild(row);

        });
    })
    .catch(function(error) {
        console.error('Error fetching data: ', error);
    });






async function handleDelete(id) {

    try {
        // Gọi API xóa
        await fetch(`
    https://api-zerot.onrender.com/product/${id}`, {
            method: 'DELETE'
        });
        const row = document.querySelector(`[data-id="${id}"]`);
        row.remove();
        await loadProducts()
    } catch (error) {
        console.error(error);
    }

}
async function handleEdit(id) {
    try {
        const response = await axios.get(
            `https://api-zerot-lowdb.onrender.com/products/${id}`
        );
        const product = response.data;
        console.log(product);
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = `Chỉnh sửa thông tin san pham : ${product.name}`;
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
  <input type="hidden" name="code" />
  <label>Name</label>
  <div class="mb-3">
    <input type="text" id="nameInput" placeholder="${product.name}" value="${product.name}" />
  </div>
  <input type="hidden" name="code" />
  <label>Price</label>
  <div class="mb-3">
    <input type="text" id="priceInput" placeholder="${product.price}" value="${product.price}" />
  </div>
  <input type="hidden" name="code" /> 
  <label>STOCK</label>
  <div class="mb-3">
    <input type="text" id="stockInput" placeholder="${product.stock}" value="${product.stock}" />
  </div>
  <input type="hidden" name="code" />
  <label>Category</label>
  <div class="mb-3">
    <input type="text" id="categoryInput" placeholder="${product.category}" value="${product.category}" />
  </div>
  <input type="hidden" name="code" />


`;
        const nameInput = document.getElementById('nameInput', 'stockInput', 'categoryInput');
        const nameValue = nameInput.value;
        const priceInput = document.getElementById('priceInput');
        const priceValue = priceInput.value;
        const stockInput = document.getElementById('stockInput');
        const stockValue = stockInput.value;
        const categoryInput = document.getElementById('categoryInput');
        const categoryValue = categoryInput.value;
        //lay input
        const modal = new bootstrap.Modal(document.getElementById('myModal'));
        modal.show();
        const saveModal = document.getElementById('btnSave');
        saveModal.addEventListener('click', async function() {
            try {
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
        })
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}



const createProductButton = document.getElementById('btnCreateProduct');
createProductButton.addEventListener('click', () => {
    createProduct();
});

async function createProduct() {

}