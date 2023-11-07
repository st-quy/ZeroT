const tbody = document.querySelector('#table-product tbody');
axios
  .get('https://api-zerot-lowdb.onrender.com/products')
  .then(function (response) {
    let index = 1;
    const products = response.data.reverse();
    products.forEach(function (product) {
      if (!product.deletedAt) {
        const row = document.createElement('tr');
        row.innerHTML = `
                            
                  <td class="align-middle text-center data-id='${product.id}'>
                  <span class="text-secondary text-xs font-weight-bold">${index}</span>
                  </td>
                  
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${
                      product.name
                    }</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${
                      product.price
                    }</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${
                      product.description
                    }</span>
                  </td>
                  <td class="align-middle text-center">
                    <image src=${product.image} style="width: 100%"/>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${
                      product.category
                    }</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${
                      product.stock
                    }</span>
                  </td>
                  <td class="align-middle text-center">
                  ${
                    product.review?.length > 0
                      ? `<span class='text-secondary text-xs font-weight-bold'>
                        ${product.review}
                      </span>`
                      : `<span class='text-secondary text-xs font-weight-bold'>Sản phẩm chưa có review</span>`
                  }
                  </td>
                  <td class="align-middle text-center">
                  <a onclick="handleEdit(${product.id})" class="">
                  <i class="fa fa-pencil cursor-pointer" aria-hidden="true"></i>
                  </a>
                  <a onclick="handleDelete(${product.id})" class="">
                  <i class="fa fa-trash cursor-pointer" ></i>
                  </a>
                  </td>`;
        tbody.appendChild(row);
        index++;
      }
    });
    $('#table-product').DataTable({
      language: {
        paginate: {
          previous: '‹',
          next: '›',
        },
        aria: {
          paginate: {
            previous: 'Previous',
            next: 'Next',
          },
        },
        url: '//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Vietnamese.json',
      },
    });
  })

  .catch(function (error) {
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
          
          <div class="mb-3">
              <input
                  readonly
                  class="form-control"
                  placeholder="${product.id}"       
                  hidden               
              />
          </div>
          <label>Tên sản phẩm</label>
          <div class="mb-3">
              <input type="text" class="form-control" id="nameInput" placeholder="${product.name}" value="${product.name}" />
          </div>
          <label>Giá sản phẩm</label>
          <div class="mb-3">
              <input type="text" class="form-control" id="priceInput" placeholder="${product.price}" value="${product.price}" />
          </div>
          <label>Mô tả sản phẩm</label>
          <div class="mb-3">
              <input type="text" class="form-control" id="descriptionInput" placeholder="${product.description}" value="${product.description}" />
          </div>
          <label>Hàng lưu giữ</label>
          <div class="mb-3">
              <input type="text" class="form-control" id="stockInput" placeholder="${product.stock}" value="${product.stock}" />
          </div>
          <label>Loại sản phẩm</label>
          <div class="mb-3">
    <select name="category" class="form-control" id="categoryInput" required>
      <option value="laptop">Laptop</option>
      <option value="accessory">Phụ kiện</option>
    </select>
  </div>
      `;

    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.show();

    const saveModal = document.getElementById('btnSave');
    saveModal.addEventListener('click', async function () {
      try {
        const nameInput = document.getElementById('nameInput');
        const priceInput = document.getElementById('priceInput');
        const stockInput = document.getElementById('stockInput');
        const categoryInput = document.getElementById('categoryInput');
        const descriptionInput = document.getElementById('descriptionInput');

        const response = await axios.patch(
          `https://api-zerot-lowdb.onrender.com/products/${id}`,
          {
            name: nameInput.value,
            price: priceInput.value,
            stock: stockInput.value,
            category: categoryInput.value,
            description: descriptionInput.value,
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
    saveModal.addEventListener('click', async function () {
      try {
        const deleteResponse = await axios.delete(
          `https://api-zerot-lowdb.onrender.com/products/${id}`
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

async function createProduct() {
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  modalTitle.textContent = `Thêm sản phẩm mới`;
  modalBody.innerHTML = `
  <label>Tên sản phẩm</label>
  <div class="mb-3">
    <input type="text" class="form-control" id="nameInput" placeholder="name" required/>
  </div>

  <label>Giá sản phẩm</label>
  <div class="mb-3">
    <input type="number" class="form-control" id="priceInput" placeholder="price" required/>
  </div>
  <label>Mô tả sản phẩm</label>
  <div class="mb-3">
    <textarea  type="text" class="form-control" id="description" placeholder="description" required></textarea>
  </div>
 
  <label>Hàng lưu trữ</label>
  <div class="mb-3">
    <input type="number" class="form-control" id="stockInput" placeholder="stock" required/>
  </div>

  <label>Loại sản phẩm</label>
  <div class="mb-3">
    <select name="category"class="form-control" id="categoryInput" required>
      <option value="laptop">Laptop</option>
      <option value="accessory">Phụ kiện</option>
    </select>
  </div>

   <label>Ảnh </label>
  <div class="mb-3">
    <input type="file" id="imageInput" multiple required/>
  </div>

`;

  const modal = new bootstrap.Modal(document.getElementById('myModal'));
  modal.show();

  var nameInput = document.querySelector('input[placeholder="name"');
  var priceInput = document.querySelector('input[placeholder="price"');
  var stockInput = document.querySelector('input[placeholder="stock"');
  var descriptionInput = document.querySelector(
    'textarea[placeholder="description"'
  );
  var categoryInput = document.querySelector('select[name="category"');
  var fileInput = document.querySelector('input[type="file"');
  const btnSave = document.getElementById('btnSave');

  btnSave.addEventListener('click', async () => {
    var name = nameInput.value;
    var price = Number(priceInput.value);
    var stock = Number(stockInput.value);
    var description = descriptionInput.value;
    var category = categoryInput.value;
    var urls = await uploadFile(fileInput.files);

    await axios
      .post('https://api-zerot-lowdb.onrender.com/products', {
        name,
        price,
        stock,
        description,
        category,
        image: urls[0],
        review: [],
      })
      .then((response) => {
        const modal = new bootstrap.Modal(document.getElementById('myModal'));
        modal.hide();
        location.reload();
      });
  });
}

const uploadFile = async (files) => {
  const CLOUD_NAME = 'dyk82loo2';
  const PRESET_NAME = 'demo-upload';
  const FOLDER_NAME = 'products';
  const urls = [];
  const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

  const formData = new FormData();

  formData.append('upload_preset', PRESET_NAME);
  formData.append('folder', FOLDER_NAME);
  for (const file of files) {
    formData.append('file', file);
    // console.log(file);
    const response = await axios.post(api, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    urls.push(response.data.url);
    return urls;
  }
};
